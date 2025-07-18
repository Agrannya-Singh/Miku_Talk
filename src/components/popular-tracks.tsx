"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const videos = [
  {
    src: "https://www.youtube.com/embed/_-2dIuV34cs",
    title: "Miku by Anamanaguchi (Lyrics Video)",
  },
  {
    src: "https://www.youtube.com/embed/NY__VTIUsiU",
    title: "[1080P Full風] World is Mine ワールドイズマイン -Hatsune Miku 初音ミク Project DIVA English lyrics Romaji PDFT",
  },
  {
    src: "https://www.youtube.com/embed/Mqps4anhz0Q",
    title: "[1080P Full風] 千本桜 Senbonzakura \"One Thousand Cherry Trees\"- 初音ミク Hatsune Miku DIVA English Romaji",
  },
  {
    src: "https://www.youtube.com/embed/udg1bIBUzJM",
    title: "「4K 60 fps」 World's End Dancehall (ワールズエンド・ダンスホール) / wowaka | Project DIVA Arcade Future Tone",
  },
];

export function PopularTracks() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Popular Tracks</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {videos.map((video, index) => (
              <CarouselItem key={index} className="lg:basis-full">
                <div className="p-1">
                    <div className="aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src={video.src}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </CardContent>
    </Card>
  )
}
