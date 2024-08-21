import { Pinecone } from "@pinecone-database/pinecone";
import { v4 as uuid4 } from "uuid";
import OpenAI from "openai";

export async function createPCReviewRecord(data) {
  const reviewText = data.review;
  const openai = new OpenAI();
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: `${reviewText} Professor ${data['professor']} teaches the ${data['subject']} subject with ${data['stars']} stars`,
    encoding_format: "float",
  });

  return {
    values: embedding.data[0].embedding,
    id: uuid4(),
    metadata: {
      professor: data["professor"],
      review: data["review"],
      subject: data["subject"],
      stars: parseInt(data["stars"]),
    },
  };
}
