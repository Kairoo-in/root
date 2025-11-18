import { NextRequest, NextResponse } from 'next/server';
import { GenerateContentConfig, GoogleGenAI, HarmBlockThreshold, HarmCategory } from '@google/genai';

const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const client = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  if (!client) {
    return NextResponse.json(
      { error: 'Gemini API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { toolId, inputs } = await request.json();
    const prompt = generatePrompt(toolId, inputs);

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // const text = result.response.text();

    const result = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: generationConfig as GenerateContentConfig,
      // safetySettings: safetySettings as SafetySettings[],
    });

    const rawText = (result as { text?: string | (() => string) }).text;
    const text = typeof rawText === 'function' ? rawText() : rawText ?? 'AI response unavailable.';

    return NextResponse.json({ result: text });
  } catch (error: unknown) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}

function generatePrompt(toolId: string, inputs: Record<string, any>): string {
  const prompts: Record<string, (inputs: Record<string, any>) => string> = {
    dynamicRoadmaps: (inputs) => `
      Create a comprehensive 12-month career roadmap for someone who wants to: ${inputs.goal || 'achieve their career goal'}
      
      Break it down into:
      1. Phase 1: Foundation (Months 1-3) - Core skills and knowledge
      2. Phase 2: Specialization (Months 4-8) - Advanced skills and projects
      3. Phase 3: Application (Months 9-12) - Real-world application and job search
      
      For each phase, provide specific, actionable steps with resources and milestones.
      Format as a structured plan with clear phases and actionable items.
    `,
    interviewCoach: (inputs) => `
      You are an expert interview coach. Help the candidate prepare for this interview question:
      Role: ${inputs.role || 'Not specified'}
      Question: ${inputs.question || 'Tell me about yourself'}
      
      Provide:
      1. A strong answer structure (STAR method)
      2. Key points to highlight
      3. Common pitfalls to avoid
      4. Follow-up questions they might ask
      5. How to demonstrate value for this specific role
    `,
    salaryCoach: (inputs) => `
      Provide salary negotiation guidance for:
      Role: ${inputs.role || 'Not specified'}
      Experience: ${inputs.experience || 'Not specified'} years
      Location: ${inputs.location || 'Not specified'}
      
      Include:
      1. Market rate analysis for this role/experience/location
      2. Negotiation strategy
      3. Key talking points
      4. When to walk away
      5. How to negotiate benefits and perks
    `,
    learningTutor: (inputs) => `
      Act as a personal tutor and explain this topic in a clear, engaging way:
      Topic: ${inputs.topic || 'Not specified'}
      
      Provide:
      1. Clear explanation of core concepts
      2. Real-world examples
      3. Common misconceptions
      4. Practice exercises
      5. Next steps for deeper learning
    `,
    pathGeneration: (inputs) => `
      Create a personalized learning path for mastering this skill:
      Skill: ${inputs.skill || 'Not specified'}
      Timeline: ${inputs.timeline || '6 months'}
      
      Structure as:
      1. Week-by-week curriculum
      2. Recommended resources (free and paid)
      3. Hands-on projects for each phase
      4. Milestones and checkpoints
      5. How to measure progress
    `
  };

  const promptGenerator = prompts[toolId] || ((inputs) => `
    Based on the following inputs, provide comprehensive, actionable guidance:
    ${JSON.stringify(inputs, null, 2)}
    
    Be specific, practical, and provide step-by-step recommendations.
  `);

  return promptGenerator(inputs);
}

