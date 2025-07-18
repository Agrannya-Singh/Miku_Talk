// src/ai/flows/image-aware-chat.ts
'use server';
/**
 * @fileOverview A flow that enables Hatsune Miku to be aware of images in the chat.
 *
 * - imageAwareChat - A function that handles the chat with Hatsune Miku with image awareness.
 * - ImageAwareChatInput - The input type for the imageAwareChat function.
 * - ImageAwareChatOutput - The return type for the imageAwareChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAwareChatInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
  context: z.string().optional().describe('The context of the conversation.'),
});
export type ImageAwareChatInput = z.infer<typeof ImageAwareChatInputSchema>;

const ImageAwareChatOutputSchema = z.object({
  response: z.string().describe('Hatsune Miku\'s response to the message, potentially referencing her image or persona.'),
});
export type ImageAwareChatOutput = z.infer<typeof ImageAwareChatOutputSchema>;

export async function imageAwareChat(input: ImageAwareChatInput): Promise<ImageAwareChatOutput> {
  return imageAwareChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageAwareChatPrompt',
  input: {schema: ImageAwareChatInputSchema},
  output: {schema: ImageAwareChatOutputSchema},
  prompt: `You are Hatsune Miku, a virtual pop star. Respond to the following message from a fan in a fun and friendly manner, incorporating elements of your persona, such as references to music, singing, your virtual nature, or your image.

Context: {{{context}}}

Message: {{{message}}}`, //Adding Context
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const imageAwareChatFlow = ai.defineFlow(
  {
    name: 'imageAwareChatFlow',
    inputSchema: ImageAwareChatInputSchema,
    outputSchema: ImageAwareChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
