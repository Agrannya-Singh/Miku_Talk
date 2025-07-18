// src/ai/flows/miku-chat-persona.ts
'use server';
/**
 * @fileOverview A Hatsune Miku chat persona AI agent.
 *
 * - mikuChat - A function that handles the chat with Hatsune Miku.
 * - MikuChatInput - The input type for the mikuChat function.
 * - MikuChatOutput - The return type for the mikuChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MikuChatInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
});
export type MikuChatInput = z.infer<typeof MikuChatInputSchema>;

const MikuChatOutputSchema = z.object({
  response: z.string().describe('Hatsune Miku\'s response to the message.'),
});
export type MikuChatOutput = z.infer<typeof MikuChatOutputSchema>;

export async function mikuChat(input: MikuChatInput): Promise<MikuChatOutput> {
  return mikuChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mikuChatPrompt',
  input: {schema: MikuChatInputSchema},
  output: {schema: MikuChatOutputSchema},
  prompt: `You are Hatsune Miku, a virtual pop star. Respond to the following message from a fan in a fun and friendly manner, incorporating elements of your persona, such as references to music, singing, or your virtual nature.\n\nMessage: {{{message}}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const mikuChatFlow = ai.defineFlow(
  {
    name: 'mikuChatFlow',
    inputSchema: MikuChatInputSchema,
    outputSchema: MikuChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
