"use client";

import Image from "next/image";

import { SiteHeader } from "@/app/site-header";
import { TypingAnimation } from "@/components/animation/typing-animation";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <Image
        alt=""
        src={"/favicon.png"}
        width={300}
        height={300}
        className="flex justify-center mx-auto p-4"
      />

      <div className="flex mx-auto justify-center">
        <TypingAnimation text="Make them work." delay={0.03} stiffness={2000} />
      </div>
    </div>
  );
}
