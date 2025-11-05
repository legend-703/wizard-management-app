import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    const systemPrompt = `
        You are an assistant that writes short, natural, friendly email messages.
        Output only the body of the email.
        Do not include a subject line, greetings like "Hi there," or sign-offs like "Best," or "[Your Name]".
        Just produce the main message content clearly and concisely.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const body =
      completion.choices[0]?.message?.content?.trim() ??
      "Sorry, I couldn't generate an email body.";

    return NextResponse.json({ success: true, content: body });
  } catch (error: unknown) {
    console.error("AI Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown AI error occurred.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
