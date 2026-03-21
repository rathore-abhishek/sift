import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Logout, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, Facehash, AvatarFallback, AvatarImage } from "facehash";

export const ProfilePopover = () => {
  return (
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
  );
};
