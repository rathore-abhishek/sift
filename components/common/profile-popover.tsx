"use client";

import { useCallback, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { authClient } from "@/client/better-auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useRouter } from "@bprogress/next";
import { Edit, Logout, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "facehash";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const ProfilePopover = () => {
  const {
    data: user,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => (await authClient.getSession()).data?.user,
  });

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

  if (isError || !user) {
    if (isError) toast.error(error?.message || "Something went wrong");
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
              name={user?.name}
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
            <AvatarImage src={user?.image || ""} className="bg-muted" />
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
              name={user?.name}
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
            <AvatarImage src={user?.image || ""} className="bg-muted" />
          </Avatar>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-muted-foreground font-medium">{user?.email}</p>
          </div>
        </div>
        <div className="flex w-full flex-col px-2 pb-3">
          <ProfileDialog user={user}>
            <Button
              variant={"ghost"}
              size={"sm"}
              className={"dark:hover:bg-accent w-full justify-start"}
            >
              <HugeiconsIcon icon={UserIcon} /> Profile
            </Button>
          </ProfileDialog>

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

const ProfileDialog = ({
  children,
  user,
}: {
  children: React.ReactElement;
  user: User;
}) => {
  const [name, setName] = useState(user.name);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      toast.error(error.message ?? "Failed to upload image");
    },
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      let imageUrl = user.image;

      if (file) {
        const res = await startUpload([file]);
        if (res?.[0]) {
          imageUrl = res[0].ufsUrl;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      const { data, error } = await authClient.updateUser({
        name,
        image: imageUrl ?? undefined,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      setOpen(false);
      setFile(null);
      setPreview(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent
        className="ring-ring/20 overflow-clip p-0 sm:max-w-sm"
        showCloseButton={false}
      >
        <div className="bg-secondary/10 dark:bg-secondary flex flex-row items-center gap-4 rounded-xl p-5 shadow-xs">
          <div
            {...getRootProps()}
            className="group relative cursor-pointer outline-none"
          >
            <input {...getInputProps()} />
            <Avatar
              className={cn(
                "bg-muted size-16 rounded-full transition-all group-hover:opacity-80",
                isDragActive && "ring-ring/50 opacity-80 ring-2 ring-offset-2"
              )}
            >
              <AvatarFallback
                name={user?.name}
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
              <AvatarImage
                src={preview || user?.image || ""}
                className="bg-muted"
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                  <Spinner className="size-5" />
                </div>
              )}
            </Avatar>
            <div
              className={cn(
                "bg-primary text-primary-foreground border-border/80 absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110",
                isUploading && "hidden"
              )}
            >
              <HugeiconsIcon icon={Edit} className="size-3" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-lg font-medium">{user?.name}</p>
            <p className="text-muted-foreground truncate text-sm">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="px-5">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <HugeiconsIcon icon={UserIcon} />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isUpdating || isUploading}
            />
          </InputGroup>
        </div>

        <DialogFooter className="bg-muted dark:bg-secondary/30 flex gap-2 p-3.5">
          <DialogClose
            render={
              <Button
                variant="outline"
                className={"flex-1"}
                disabled={isUpdating || isUploading}
              >
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            className={"flex-1"}
            disabled={isUpdating || isUploading}
            onClick={() => updateProfile()}
          >
            {isUpdating || isUploading ? (
              <>
                <Spinner /> Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
