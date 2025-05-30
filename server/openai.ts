import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ScenarioResponse {
  title: string;
  content: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export async function generateScenario(question: string, category: string): Promise<ScenarioResponse> {
  try {
    const prompt = `You are an expert alternative universe simulator. Generate a detailed, creative, and plausible "What If" scenario based on the user's question.

Question: "${question}"
Category: ${category}

Create a comprehensive alternative universe scenario that explores the consequences and implications of this change. Structure your response as JSON with the following format:

{
  "title": "A compelling title for the scenario",
  "content": "A brief introduction paragraph",
  "sections": [
    {
      "title": "Section title (e.g., 'Technological Development')",
      "content": "Detailed content for this section"
    },
    {
      "title": "Another section title (e.g., 'Social Implications')",
      "content": "Detailed content for this section"
    },
    {
      "title": "Final section title (e.g., 'Long-term Consequences')",
      "content": "Detailed content for this section"
    }
  ]
}

Make the scenario:
- Scientifically plausible and logically consistent
- Creative and thought-provoking
- Detailed with specific examples
- Well-structured with 3-4 main sections
- Around 400-600 words total
- Engaging and accessible to general audiences

Focus on cause-and-effect relationships and ripple effects across different aspects of society, technology, environment, etc.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert alternative universe simulator that creates detailed, plausible scenarios exploring the consequences of hypothetical changes to history, society, or reality."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 1500,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    if (!result.title || !result.content || !result.sections) {
      throw new Error("Invalid response format from OpenAI");
    }

    return result as ScenarioResponse;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate scenario: " + (error as Error).message);
  }
}
