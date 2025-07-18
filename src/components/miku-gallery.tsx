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

const images = [
    {
        src: "https://static.wikia.nocookie.net/projectsekai/images/9/9f/Vividbadsquad-miku.png/revision/latest/scale-to-width-down/1000?cb=20230616181250",
        alt: "Vivid BAD SQUAD Miku",
    },
    {
        src: "https://static.wikia.nocookie.net/projectsekai/images/0/00/25ji-miku.png/revision/latest/scale-to-width-down/1000?cb=20230616181455",
        alt: "25-ji, Nightcord de. Miku",
    },
    {
        src: "https://static.wikia.nocookie.net/projectsekai/images/e/eb/Happy_Anniversary%21%21_%28Miku%29_transparent.png/revision/latest?cb=20220830163924",
        alt: "Happy Anniversary Miku",
    },
    {
        src: "https://static.wikia.nocookie.net/projectsekai/images/c/cc/Half-Anniversary_Exhibition_Jimmy.jpg/revision/latest?cb=20231020184449",
        alt: "Half-Anniversary Exhibition Miku",
    },
];

export function MikuGallery() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Miku Gallery</CardTitle>
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
            {images.map((image, index) => (
              <CarouselItem key={index} className="lg:basis-full">
                <div className="p-1">
                    <div className="aspect-video relative">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                        />
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
