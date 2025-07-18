import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">MikuTalk</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Chat
            </Link>
            <Link href="/about" className="font-semibold text-foreground">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl p-4 md:p-8">
        <div className="flex flex-col items-center gap-8">
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                 <Image
                    src="https://placehold.co/1024x256.png"
                    alt="Hatsune Miku live performance"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                    data-ai-hint="anime concert"
                 />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-shadow-lg" style={{textShadow: '2px 2px 8px hsl(var(--primary))'}}>
                        About Hatsune Miku
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg font-medium" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>The World's Most Famous Virtual Idol</p>
                 </div>
            </div>
            
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-primary">
                            <AvatarImage src="https://placehold.co/128x128.png" data-ai-hint="hatsune miku" alt="Hatsune Miku Avatar" />
                            <AvatarFallback>HM</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-headline">Hatsune Miku (初音ミク)</CardTitle>
                            <p className="text-muted-foreground">The First Sound of the Future</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 text-base leading-relaxed">
                    <p>
                        Hatsune Miku is a singing synthesizer application with a female persona, developed by Crypton Future Media. It uses Yamaha Corporation's Vocaloid 2, Vocaloid 3, and Vocaloid 4 singing synthesizing technologies. Her voice is sampled from Japanese voice actress Saki Fujita. Miku's personification has been marketed as a virtual idol and has performed at live concerts onstage as an animated projection.
                    </p>
                    <Separator />
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-primary">Development and Concept</h3>
                            <p>
                            Miku was developed by Crypton Future Media, using Yamaha's Vocaloid 2 engine. The name "Hatsune Miku" was conceived by combining the Japanese words for first (初, hatsu), sound (音, ne), and future (ミク, miku), thus meaning "the first sound of the future." This represents Crypton's idea of her being the first of a series of "Character Vocal Series."
                            </p>
                        </div>
                        <div className="space-y-2">
                             <h3 className="font-semibold text-lg text-primary">Cultural Impact</h3>
                            <p>
                            Hatsune Miku has become a global phenomenon. Initially a niche product, her popularity surged through online platforms like Nico Nico Douga and YouTube, where users created and shared songs using her software. This user-generated content model turned Miku into a crowdsourced virtual celebrity, with a vast and ever-expanding library of music and art created by her fans. She has since performed sold-out "live" concerts worldwide and collaborated with major artists like Lady Gaga.
                            </p>
                        </div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                            "She is not just a piece of software, but a cultural icon that has redefined the possibilities of music and creativity in the digital age."
                        </blockquote>
                    </div>
                    <div className="text-center">
                        <Button asChild>
                            <Link href="/">Chat with Miku</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>MikuTalk is powered by Gemini. About page content is based on public information.</p>
      </footer>
    </div>
  );
}
