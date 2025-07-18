import { Chat } from '@/components/chat';
import { Icons } from '@/components/icons';
import { PopularTracks } from '@/components/popular-tracks';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">MikuTalk</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm flex-1">
             <Link href="/" className="font-semibold text-foreground">
              Chat
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col items-center p-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
             <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-32 h-32 mb-4">
                  <Image src="https://placehold.co/256x256.png" data-ai-hint="hatsune miku anime" alt="Hatsune Miku" layout="fill" className="rounded-full object-cover shadow-lg border-4 border-primary/50" />
                </div>
                <h1 className="font-headline animate-text-glow text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                  MikuTalk
                </h1>
                <p className="text-muted-foreground mt-2">
                  Talk to the world's most famous virtual idol. Powered by Gemini.
                </p>
             </div>
             <Chat />
          </div>
          <aside className="lg:col-span-2 space-y-8 mt-8 lg:mt-0">
            <PopularTracks />
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
                <Image
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="music production"
                    alt="Music studio"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                    <Icons.logo className="h-12 w-12 mb-4" />
                    <h3 className="font-headline text-2xl font-bold">Discover New Music</h3>
                    <p className="mt-2">Ask Miku about her songs or any topic you can imagine!</p>
                </div>
            </div>
          </aside>
        </div>
      </main>
      <footer className="p-4 mt-8 text-center text-sm text-muted-foreground border-t w-full">
        <p>
          Hatsune Miku is a character by{' '}
          <a
            href="https://ec.crypton.co.jp/pages/prod/vocaloid/mikuv4x"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Crypton Future Media, INC.
          </a>
        </p>
      </footer>
    </div>
  );
}
