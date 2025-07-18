'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getMikuResponse } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const mikuAvatarUrl = "https://avatarfiles.alphacoders.com/340/thumb-350-340919.webp";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

const LoadingDots = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/80 [animation-delay:-0.3s]" />
    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/80 [animation-delay:-0.15s]" />
    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/80" />
  </div>
);

export function Chat() {
  const { toast } = useToast();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm Hatsune Miku! It's so nice to meet you. What should we talk about? Maybe music, or singing, or anything you like! ✨",
    },
  ]);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const messageValue = form.watch('message');

  React.useEffect(() => {
    if (textAreaRef.current) {
        textAreaRef.current.style.height = "0px";
        const scrollHeight = textAreaRef.current.scrollHeight;
        textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [messageValue]);


  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: values.message,
    };

    const chatHistoryForAI = messages
      .filter((msg): msg is Message & { content: string } => typeof msg.content === 'string')
      .map(({ role, content }) => ({ role, content }));

    const tempId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: tempId,
      role: 'assistant',
      content: <LoadingDots />,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    form.reset();

    startTransition(async () => {
      const result = await getMikuResponse(values.message, chatHistoryForAI);

      if (result.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, content: result.response } : msg
          )
        );
      } else {
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
        toast({
          variant: 'destructive',
          title: 'Oh no! Something went wrong.',
          description: result.error,
        });
      }
    });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Card className="w-full max-w-2xl h-[70vh] flex flex-col shadow-2xl shadow-primary/10">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary/50">
          <AvatarImage src={mikuAvatarUrl} alt="Hatsune Miku" />
          <AvatarFallback>HM</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="font-headline text-lg">Hatsune Miku</CardTitle>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mikuAvatarUrl} alt="Hatsune Miku" />
                    <AvatarFallback>HM</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow',
                    message.role === 'user'
                      ? 'rounded-br-none bg-primary text-primary-foreground'
                      : 'rounded-bl-none bg-card text-card-foreground'
                  )}
                >
                  {typeof message.content === 'string' ? (
                     <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-start gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      ref={textAreaRef}
                      placeholder="Sing a song for Miku..."
                      className="resize-none overflow-hidden"
                      rows={1}
                      onKeyDown={handleKeyDown}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isPending || !form.formState.isValid} aria-label="Send message">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
