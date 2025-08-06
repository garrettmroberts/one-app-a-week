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
    const response = await openai.responses.create({
      model: "gpt-4o",
      input: [
        {
          role: "system",
          content:
            "You are an expert curriculum designer. Always respond with valid JSON that follows the exact structure specified. Do not include any explanatory text outside the JSON.",
        },
        {
          role: "user",
          content: `Create a comprehensive syllabus for learning about ${subject}. Return ONLY a JSON object with this exact structure:
{
  "topics": [
    {
      "name": "Topic Name",
      "subtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"]
    }
  ]
}

Include 5-8 main topics, each with 3-6 subtopics. Focus on creating a logical learning progression.`,
        },
      ],
    });

    return new Response(JSON.stringify(response.output_text), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
