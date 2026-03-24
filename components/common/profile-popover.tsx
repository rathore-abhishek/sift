"use client";

import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";
import { orpc } from "@/client/orpc";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Logout, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "facehash";
import { toast } from "sonner";

export const ProfilePopover = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(orpc.user.getUser.queryOptions({ queryKey: ["user-session"] }));

  if (isError) {
    toast.error("Faild to load user");
    return (
      <Avatar className="size-9 rounded-full">
        <AvatarFallback
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
            intensity3d: "medium",
          }}
        />
      </Avatar>
    );
  }

  return (
    <Popover>
      <PopoverTrigger disabled={isLoading || isError}>
        {isLoading ? (
          <Avatar className="size-9 rounded-full">
            <AvatarFallback
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
                intensity3d: "none",
                enableBlink: true,
                onRenderMouth: () => <Spinner className="size-3.5" />,
              }}
            />
          </Avatar>
        ) : (
          <Avatar className="size-9 rounded-full">
            <AvatarFallback
              name={user?.name}
              facehash={true}
              facehashProps={{
                colors: [
                  "var(--color-teal-400)",
                  "var(--color-cyan-400)",
                  "var(--color-sky-400)",
                  "var(--color-blue-400)",
                  "var(--color-indigo-400)",
                ],
              }}
            />
            <AvatarImage src={user?.image} className="bg-muted" />
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={"w-fit overflow-clip border-red-500 p-0"}
        align="end"
      >
        <div className="bg-secondary/10 dark:bg-secondary flex flex-row items-center gap-2 rounded-b-xl p-5">
          <Avatar className="size-10 rounded-full">
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
            <AvatarImage src={user?.image} className="bg-muted" />
          </Avatar>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-muted-foreground font-medium">{user?.email}</p>
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
