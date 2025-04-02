import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, input } = body;

    if (!model || !input) {
      return NextResponse.json(
        { error: "Missing required fields: model or input" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model,
      input,
    });

    return NextResponse.json({ output_text: response.output_text });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI" },
      { status: 500 }
    );
  }
}
