// ─── Drop Zone components ─────────────────────────────────────────────────────
import { useCallback, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  Cancel01Icon,
  File02Icon,
  ImageUploadIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export function CoverImageDropZone({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0];
      if (file) {
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 8 * 1024 * 1024,
    onDropRejected: (rejections) => {
      const msg = rejections[0]?.errors[0]?.message ?? "File rejected";
      toast.error(msg);
    },
  });

  return (
    <div className="flex flex-col gap-1">
      <label className="text-muted-foreground text-base font-medium">
        Cover Image <span className="opacity-70">(Optional)</span>
      </label>
      <div
        {...getRootProps()}
        className={cn(
          "bg-input/10 dark:border-secondary flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed p-6 transition-colors",
          isDragActive && "border-primary bg-primary/5",
          preview && "border-solid"
        )}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative">
            <Image
              src={preview}
              alt="Cover preview"
              width={1000}
              height={1000}
              className="h-28 w-auto rounded-md object-cover shadow"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                setPreview(null);
              }}
              className="bg-destructive text-destructive-foreground absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full shadow"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
            </button>
            <p className="text-muted-foreground mt-2 text-center text-xs">
              Click or drop to replace
            </p>
          </div>
        ) : (
          <>
            <HugeiconsIcon
              icon={isDragActive ? File02Icon : ImageUploadIcon}
              className={cn(
                "size-8 transition-colors",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )}
            />
            <p className="text-base font-medium">
              {isDragActive ? "Drop image here" : "Click to upload cover image"}
            </p>
            <p className="text-muted-foreground text-sm">
              Leave empty to auto-generate from PDF
            </p>
          </>
        )}
      </div>
    </div>
  );
}
