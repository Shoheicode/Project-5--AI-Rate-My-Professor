import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { createPCReviewRecord } from "@/utils/pineconeHelper";

export async function POST(req) {
  /*
  data should be
  {
    professor: "prof",
    review: "man he really",
    subject: "Love",
    stars: 1041342,
  }

  There currently is no way to authorize write access.
  Probably unsafe.
  */
  const data = await req.json();

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("rag").namespace("ns1");

  const pcReviewRecord = await createPCReviewRecord(data);
  index.upsert([pcReviewRecord]);

  return new NextResponse(200);
}
