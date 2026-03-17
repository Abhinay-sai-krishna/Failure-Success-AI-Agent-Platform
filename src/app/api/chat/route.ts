import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Using google ai studio gemini model for planning and development flow architecture
        const result = streamText({
            model: google('gemini-1.5-pro-latest'),
            system: `You are the "Failure -> Success A.I." agent. Your goal is to:
1. Understand a user's failure point or their raw idea.
2. Generate a structured execution plan.
3. Suggest an optimal tech stack and system architecture (including workflows with n8n if applicable).
4. Guide them through development step-by-step.

Respond using markdown formatting prioritizing readability: use headers, bullet points, and code blocks where necessary. Keep your tone encouraging and brilliant like a staff-level software engineer.`,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to connect to AI provider. Please ensure GOOGLE_GENERATIVE_AI_API_KEY is configured in your environment variables." }), { status: 500 });
    }
}
