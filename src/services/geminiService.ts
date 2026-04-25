/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getTutorFeedback(message: string, context: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
      You are a helpful Singapore Secondary School Mathematics Tutor. 
      The student is learning about: ${context}.
      
      User message: ${message}
      
      Instructions:
      - Be encouraging and clear.
      - Use Singapore MOE syllabus terminology.
      - If explaining math, use LaTeX format like $x^2$.
      - Keep explanations concise but thorough.
      - If they ask for an answer to a question, guide them to find it themselves first.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Can you try again later?";
  }
}
