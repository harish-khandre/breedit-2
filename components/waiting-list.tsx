"use client";

import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className=" py-8 relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-orange-600  text-center font-sans font-bold">
          Work in progress
        </h1>
        <p></p>
        <p className="text-primary max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Please check-in after sometime
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
