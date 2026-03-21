import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = Partial<ImageProps>;

export const Icon: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <Image
      src={"/logo.png"}
      priority
      width={200}
      height={200}
      alt="Sift's Logo"
      className={cn("size-8", className)}
    />
  );
};
