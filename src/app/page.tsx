import { Chat } from '@/components/chat';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <header className="mt-8 flex items-center gap-2 text-primary sm:mt-16">
        <Icons.logo className="h-8 w-8 sm:h-10 sm:w-10" />
        <h1 className="font-headline animate-text-glow text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          MikuTalk
        </h1>
      </header>
      <main className="flex w-full flex-1 flex-col items-center p-4">
        <Chat />
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>Talk to the world's most famous virtual idol. Powered by Gemini.</p>
      </footer>
    </div>
  );
}
