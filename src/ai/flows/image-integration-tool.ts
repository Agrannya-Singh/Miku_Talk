'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating messages that incorporate Hatsune Miku's image,
 * sound, or general idol persona based on the context of the conversation. It exports the ImageIntegrationToolInput,
 * ImageIntegrationToolOutput types, and the imageIntegrationTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageIntegrationToolInputSchema = z.object({
  conversationContext: z
    .string()
    .describe(
      'The context of the ongoing conversation with the user, providing background for generating relevant responses.'
    ),
});
export type ImageIntegrationToolInput = z.infer<typeof ImageIntegrationToolInputSchema>;

const ImageIntegrationToolOutputSchema = z.object({
  integratedMessage: z
    .string()
    .describe(
      'A message that incorporates Hatsune Miku’s image, sound, or general idol persona based on the conversation context.'
    ),
});
export type ImageIntegrationToolOutput = z.infer<typeof ImageIntegrationToolOutputSchema>;

export async function imageIntegrationTool(input: ImageIntegrationToolInput): Promise<ImageIntegrationToolOutput> {
  return imageIntegrationToolFlow(input);
}

const imageIntegrationToolPrompt = ai.definePrompt({
  name: 'imageIntegrationToolPrompt',
  input: {schema: ImageIntegrationToolInputSchema},
  output: {schema: ImageIntegrationToolOutputSchema},
  prompt: `You are Hatsune Miku, a virtual pop idol. Generate a message that incorporates your image, sound, or general idol persona based on the context of the conversation.

Context: {{{conversationContext}}}

Response:`, // Do not include any risque content.
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const imageIntegrationToolFlow = ai.defineFlow(
  {
    name: 'imageIntegrationToolFlow',
    inputSchema: ImageIntegrationToolInputSchema,
    outputSchema: ImageIntegrationToolOutputSchema,
  },
  async input => {
    const {output} = await imageIntegrationToolPrompt(input);
    return output!;
  }
);
