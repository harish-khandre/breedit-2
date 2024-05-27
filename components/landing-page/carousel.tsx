"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AutoPlay from "embla-carousel-autoplay";

interface ImageObject {
  image: string;
  title: string;
  link: string;
  button: string;
  id: number;
}

const Images: ImageObject[] = [
  {
    image: "https://imgur.com/fvpgyd4.png",
    title: "Healthy Living",
    link: "#hospitals",
    button: "Connect to breedit",
    id: 1,
  },
  {
    image: "https://i.imgur.com/5TS3Gz6.png",
    title: "Healthy LifeStyle",
    link: "#about",
    button: "More about us",
    id: 2,
  },
  {
    image: "https://i.imgur.com/MAucF1M.png",
    title: "Your Health Benefits",
    link: "/guidelines",
    button: "Guidelines",
    id: 3,
  },
  {
    image: "https://imgur.com/7Cpiw3v.png",
    title: "Your Health Benefits",
    link: "/guidelines",
    button: "Guidelines",
    id: 3,
  },
];

export function CarouselDemo() {
  return (
    <div className="grid place-items-center my-2 ">
      <Carousel
        className="w-[90%]"
        plugins={[
          AutoPlay({
            delay: 4000,
            loop: true,
          }),
        ]}
      >
        <CarouselContent>
          {Images.map((image: ImageObject) => (
            <CarouselItem key={image.id}>
              <div className="relative text-center">
                <div className="grid place-items-center">
                  <img
                    src={image.image}
                    className="h-[40rem] w-full mx-auto object-fit rounded-2xl"
                    alt="pic"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 transform translate-x-[22rem] -translate-y-1/2">
                  <h1 className="text-4xl text-primary my-8 font-bold">
                    {image.title}
                  </h1>
                  <Link href={image.link}>
                    <Button variant="default" className="text-lg">
                      {image.button}
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
