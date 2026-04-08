"use client";

import { Spinner } from "../ui/spinner";
import { authClient } from "@/client/better-auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "@bprogress/next";
import { Logout, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "facehash";
import { toast } from "sonner";

export const ProfilePopover = () => {
  const { data, error, isPending: isLoading } = authClient.useSession();

  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();

      if (error) {
        throw error;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => push("/auth/login"),
  });

  if (error) {
    toast.error(error.message);
    return (
      <Avatar className="size-9 rounded-full">
        <AvatarFallback
          facehash={true}
          className="text-white"
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
      <PopoverTrigger disabled={isLoading || !!error}>
        {isLoading ? (
          <Avatar className="size-9 rounded-full">
            <AvatarFallback
              facehash={true}
              className="text-white"
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
          <Avatar className="bg-secondary/20 dark:bg-secondary size-9 rounded-full">
            <AvatarFallback
              name={data?.user?.name}
              facehash={true}
              className="text-white"
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
            <AvatarImage src={data?.user?.image} className="bg-muted" />
          </Avatar>
        )}
      </PopoverTrigger>
      <PopoverContent
        className={"w-fit overflow-clip border-red-500 p-0"}
        align="end"
      >
        <div className="bg-secondary/10 dark:bg-secondary flex flex-row items-center gap-2 rounded-b-xl p-5">
          <Avatar className="bg-muted size-10 rounded-full">
            <AvatarFallback
              name={data?.user?.name}
              facehash={true}
              className="text-white"
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
            <AvatarImage src={data?.user?.image} className="bg-muted" />
          </Avatar>
          <div>
            <p className="font-medium">{data?.user?.name}</p>
            <p className="text-muted-foreground font-medium">
              {data?.user?.email}
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
            disabled={isPending}
            className={
              "dark:hover:bg-destructive/10 dark:hover:text-destructive hover:bg-destructive/10 hover:text-destructive justify-start"
            }
            onClick={() => mutate()}
          >
            {isPending ? <Spinner /> : <HugeiconsIcon icon={Logout} />} Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
