import React from "react";

import Image from "next/image";

export const Logo: React.FC = () => {
  return (
    <figure className="inline-flex items-center gap-2">
      <Image
        src={"/logo.png"}
        priority
        width={200}
        height={200}
        alt="Sift's Logo"
        className="size-8"
      />
      <figcaption className="font text-2xl font-medium tracking-wide text-shadow-sm text-shadow-white/20">
        Sift
      </figcaption>
    </figure>
  );
};
