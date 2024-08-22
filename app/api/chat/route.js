import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `
You are a rate my professor agent to help students find classes, that takes in user questions and answers them.
For every user question, the top 3 professors that match the user question are returned.
Use them to answer the question if needed.
`;

// Takes user query, combines it with a vector search in Pinecone, and makes the query to OpenAI
// Provides context-aware responses
export async function POST(req) {
  const data = await req.json();

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("rag").namespace("ns1");
  const openai = new OpenAI();

  // create embedding for the user's question
  const text = data[data.length - 1].content;
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  // query using the embedding
  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });

  // Process the Pinecone results into a readable string
  let jsonArr = [];
  let resultString = "";
  results.matches.forEach((match) => {
    jsonArr.push({
      professor: match.metadata.professor,
      stars: match.metadata.stars,
      subject: match.metadata.subject,
    });
    resultString += `
        Returned Results:
        Professor: ${match.metadata.professor}
        Review: ${match.metadata.stars}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`;
  });

  // Combine user's question with Pinecone results
  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  // Create chat completion request to OpenAI with the systemPrompt and the combined user query
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    model: "gpt-3.5-turbo",
    stream: true,
  });

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const jsonText = encoder.encode(JSON.stringify({ data: jsonArr }));
        controller.enqueue(jsonText);

        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
