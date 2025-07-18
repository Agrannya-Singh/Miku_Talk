'use server';

import { imageAwareChat } from '@/ai/flows/image-aware-chat';
import { z } from 'zod';

const historyItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const chatSchema = z.object({
  message: z.string().min(1),
  history: z.array(historyItemSchema),
});

export async function getMikuResponse(
  userInput: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
) {
  try {
    const validatedInput = chatSchema.safeParse({
      message: userInput,
      history,
    });
    if (!validatedInput.success) {
      console.error('Action validation error:', validatedInput.error.flatten());
      return { success: false, error: 'Invalid input.' };
    }

    const { message, history: chatHistory } = validatedInput.data;

    // Create a context string from the history for the AI
    const conversationContext = chatHistory
      .map((msg) => `${msg.role === 'user' ? 'Fan' : 'Miku'}: ${msg.content}`)
      .join('\n');

    const result = await imageAwareChat({
      message: message,
      context: conversationContext,
    });

    if (result && result.response) {
      return { success: true, response: result.response };
    } else {
      throw new Error('AI response was empty or invalid.');
    }
  } catch (error) {
    console.error('Error calling Miku chat AI:', error);
    return { success: false, error: 'Something went wrong. Please try again!' };
  }
}
