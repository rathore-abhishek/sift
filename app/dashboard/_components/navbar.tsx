"use client";

import { ThemeToggle } from "./theme-toggle";
import { Logo } from "@/components/logos/logo";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, Facehash, AvatarFallback, AvatarImage } from "facehash";

export const Navbar: React.FC = () => {
  return (
    <div className="relative">
      {/* Full-width horizontal line below header */}
      <div className="bg-border absolute right-0 bottom-0 left-0 h-px w-full" />

      <header className="bg-secondary/20 dark:bg-secondary mx-auto flex max-w-7xl items-center justify-between border-x">
        <div className="bg-background flex w-full items-center justify-between px-5 pt-6 pb-5">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Popover>
              <PopoverTrigger>
                <Avatar className="size-9 rounded-full">
                  <AvatarFallback
                    name="Abhishek"
                    facehash={true}
                    facehashProps={{
                      colors: [
                        "var(--color-teal-400)",
                        "var(--color-cyan-400)",
                        "var(--color-sky-400)",
                        "var(--color-blue-400)",
                        "var(--color-indigo-400)",
                        "var(--color-rose-400)",
                      ],
                    }}
                  />
                  <AvatarImage src={"/logo.png"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent></PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </div>
  );
};
