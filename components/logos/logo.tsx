import React from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = Partial<ImageProps>;

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <figure className="inline-flex items-center gap-2">
      <Image
        src={"/logo.png"}
        priority
        width={200}
        height={200}
        alt="Sift's Logo"
        className={cn("size-8", className)}
      />
      <figcaption className="font text-2xl leading-0 font-medium tracking-wide text-shadow-sm text-shadow-white/20">
        Sift
      </figcaption>
    </figure>
  );
};
