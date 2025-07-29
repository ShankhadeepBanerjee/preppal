"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return (
    interviews.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Interview)
    ) || null
  );
}

export async function getLatestIntrviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("userId", "!=", userId)
    .where("finalized", "==", true)
    .limit(limit)
    .get();

  return (
    interviews.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Interview)
    ) || null
  );
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();
  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams): Promise<{
  success: boolean;
  message: string;
  feedbackId?: string;
}> {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}`
      )
      .join("\n");

    // Generate feedback using AI
    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject<Feedback>({
      model: google("gemini-2.5-flash", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        
        Transcript:
        ${formattedTranscript}

        Please provide a detailed feedback response in the following JSON format:
        {
          "totalScore": [A single overall score from 0-100 representing the candidate's total performance],
          "categoryScores": [
            {
              "name": "Communication Skills",
              "score": [Score from 0-100 for clarity, articulation, structured responses],
              "comment": "[Brief comment explaining the score]"
            },
            {
              "name": "Technical Knowledge",
              "score": [Score from 0-100 for understanding of key concepts for the role],
              "comment": "[Brief comment explaining the score]"
            },
            {
              "name": "Problem Solving",
              "score": [Score from 0-100 for ability to analyze problems and propose solutions],
              "comment": "[Brief comment explaining the score]"
            },
            {
              "name": "Cultural Fit",
              "score": [Score from 0-100 for alignment with company values and job role],
              "comment": "[Brief comment explaining the score]"
            },
            {
              "name": "Confidence and Clarity",
              "score": [Score from 0-100 for confidence in responses, engagement, and clarity],
              "comment": "[Brief comment explaining the score]"
            }
          ],
          "strengths": ["List at least 2-3 key strengths observed during the interview"],
          "areasForImprovement": ["List at least 2-3 areas where the candidate can improve"],
          "finalAssessment": "[A comprehensive final assessment paragraph of 3-4 sentences summarizing the candidate's performance, potential fit for the role, and recommendation]"
        }
        
        Please score the candidate from 0 to 100 in the following areas:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories and provide a comprehensive feedback in JSON format.",
    });

    const feedbackData = {
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    };

    const feedback = await db.collection("feedback").add(feedbackData);

    return {
      success: true,
      message: "Feedback created successfully",
      feedbackId: feedback.id,
    };
  } catch (error) {
    console.error("Error creating feedback:", error);
    return {
      success: false,
      message: "Failed to create feedback",
    };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;
  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (feedback.empty) return null;
  const feedbackDoc = feedback.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}
