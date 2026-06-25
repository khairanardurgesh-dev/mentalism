import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { archetype, scores } = await request.json();

    const systemPrompt = `You are generating an entertainment-based digital mentalism reading.

The reading should feel surprisingly personal and insightful.

Do not claim certainty.
Do not claim psychic abilities.
Do not predict the future.

The reading should contain:
1. Emotional observation.
2. Hidden strength.
3. Inner struggle.
4. Relationship pattern.
5. Current challenge.
6. Encouraging insight.
7. Reflection question.

Tone: Warm, mysterious, intelligent.

Maximum length: 500 words.

Output JSON format:
{
  "headline": "A compelling headline about their personality",
  "insights": [
    {
      "type": "emotional_observation",
      "text": "You often..."
    },
    {
      "type": "hidden_strength",
      "text": "One of your greatest strengths..."
    },
    {
      "type": "inner_struggle",
      "text": "You may sometimes struggle with..."
    },
    {
      "type": "relationship_pattern",
      "text": "In relationships, you tend to..."
    },
    {
      "type": "current_challenge",
      "text": "Right now, you might be facing..."
    },
    {
      "type": "encouraging_insight",
      "text": "Remember that..."
    }
  ],
  "reflection_questions": [
    "A thought-provoking question...",
    "Another question..."
  ],
  "shareable_line": "A short, shareable line about their archetype"
}`;

    const userPrompt = `Generate a reading for someone with the archetype "${archetype}".
Their personality scores are:
- Overthinking: ${scores.overthinking}/10
- Confidence: ${scores.confidence}/10
- Relationship Focus: ${scores.relationshipFocus}/10
- Career Anxiety: ${scores.careerAnxiety}/10
- Family Attachment: ${scores.familyAttachment}/10
- Need for Validation: ${scores.needForValidation}/10
- Risk Taking: ${scores.riskTaking}/10
- Self Doubt: ${scores.selfDoubt}/10

Create a reading that feels personal and insightful using the Barnum Effect and high-probability statements. Use language like "you often", "you may", "many people in your situation" rather than definitive claims.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content generated");
    }

    const result = JSON.parse(content);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating insights:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
