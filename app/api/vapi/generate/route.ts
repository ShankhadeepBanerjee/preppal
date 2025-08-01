import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  return Response.json(
    {
      message: "This is a GET request",
      status: "success",
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
    `,

      //   maxTokens: 1000,
      //   temperature: 0.7,
      //   topP: 1,
      //   frequencyPenalty: 0,
      //   presencePenalty: 0,
      //   stopSequences: ["\n"],
    });

    // Clean the response by removing markdown code block syntax
    const cleanedQuestions = questions.replace(/```json|```/g, "").trim();
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(cleanedQuestions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json(
      {
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      {
        message: "An error occurred while processing your request.",
        status: "error",
      },
      { status: 500 }
    );
  }
}
