"use client";

import Image from "next/image";

import { ThemeToggle } from "./theme-toggle";
import { Logo } from "@/components/logos/logo";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Logout, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
                  <AvatarImage src={"/abhishek.png"} className="bg-muted" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className={"w-fit overflow-clip border-red-500 p-0"}
                align="end"
              >
                <div className="bg-secondary/10 dark:bg-secondary flex flex-row items-center gap-2 rounded-b-xl p-5">
                  <Image
                    src={"/logo.png"}
                    alt="Profile Pic"
                    width={200}
                    height={200}
                    className="size-10 rounded-full"
                  />{" "}
                  <div>
                    <p className="font-medium">Abhishek Rathore</p>
                    <p className="text-muted-foreground font-medium">
                      abishek@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col px-2 pb-3">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className={"dark:hover:bg-accent justify-start"}
                  >
                    <HugeiconsIcon icon={User} /> Profile
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className={
                      "dark:hover:bg-destructive/10 dark:hover:text-destructive hover:bg-destructive/10 hover:text-destructive justify-start"
                    }
                  >
                    <HugeiconsIcon icon={Logout} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    </div>
  );
};
