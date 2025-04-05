import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");

  if (!subject) {
    return new Response(
      "invalid request: missing required parameters: subject",
      { status: 400 }
    );
  }
  try {
    const stream = await openai.responses.create({
      model: "gpt-4o",
      input: [
        {
          role: "user",
          content: `You are a teacher. Create a bulleted list of topics that should be studied for a student to gain a better understanding of ${subject}. Format your response as an array. Each array element should be an object with a name field and a subtopics field. Do not return triple backticks or the words 'json'.`,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
              const text = event.delta;
              controller.enqueue(encoder.encode(`data: ${text}\n\n`));
            } else if (event.type === "response.completed") {
              controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
              controller.close();
            }
          }
        } catch (error: unknown) {
          console.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
