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

const tracks = [
    "https://www.youtube.com/embed/_-2dIuV34cs",
    "https://www.youtube.com/embed/NY__VTIUsiU",
    "https://www.youtube.com/embed/Mqps4anhz0Q",
    "https://www.youtube.com/embed/udg1bIBUzJM",
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
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {tracks.map((track, index) => (
              <CarouselItem key={index} className="lg:basis-full">
                <div className="p-1">
                    <div className="aspect-[4/3] relative">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src={track}
                            title={`YouTube video player ${index + 1}`}
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
