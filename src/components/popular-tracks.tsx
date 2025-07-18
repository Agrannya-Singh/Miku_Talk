"use client"

import * as React from "react"
import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const tracks = [
  {
    title: "World is Mine",
    artist: "ryo (supercell)",
    image: "https://placehold.co/400x400.png",
    hint: "anime princess"
  },
  {
    title: "Melt",
    artist: "ryo (supercell)",
    image: "https://placehold.co/400x400.png",
    hint: "anime couple"
  },
  {
    title: "PoPiPo",
    artist: "LamazeP",
    image: "https://placehold.co/400x400.png",
    hint: "vegetable juice"
  },
  {
    title: "Tell Your World",
    artist: "livetune",
    image: "https://placehold.co/400x400.png",
    hint: "digital world"
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
            {tracks.map((track, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-full">
                <div className="p-1">
                  <div className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={track.image}
                        alt={`Cover for ${track.title}`}
                        data-ai-hint={track.hint}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{track.title}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {track.artist}
                      </p>
                    </div>
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
