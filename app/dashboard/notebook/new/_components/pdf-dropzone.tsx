"use client";

import { useCallback } from "react";

import { cn } from "@/lib/utils";
import {
  CheckmarkCircle02Icon,
  File02Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function PdfDropZone({
  value,
  onChange,
  error,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) onChange(accepted[0]);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
    onDropRejected: (rejections) => {
      const msg = rejections[0]?.errors[0]?.message ?? "File rejected";
      toast.error(msg);
    },
  });

  return (
    <div className="flex flex-col gap-1">
      <label className="text-muted-foreground text-base font-medium">
        Upload PDF
      </label>
      <div
        {...getRootProps()}
        className={cn(
          "bg-input/10 dark:border-secondary flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed p-6 transition-colors",
          isDragActive && "border-primary bg-primary/5",
          error && "border-destructive",
          value && "border-solid border-green-500/60 bg-green-500/5"
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <>
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="size-8 text-green-500"
            />
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              {value.name}
            </p>
            <p className="text-muted-foreground text-xs">
              {(value.size / 1024 / 1024).toFixed(2)} MB — click or drop to
              replace
            </p>
          </>
        ) : (
          <>
            <HugeiconsIcon
              icon={isDragActive ? File02Icon : Upload01Icon}
              className={cn(
                "size-8 transition-colors",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )}
            />
            <p className="text-base font-medium">
              {isDragActive ? "Drop PDF here" : "Click to upload PDF"}
            </p>
            <p className="text-muted-foreground text-sm">
              PDF file (max 50 MB)
            </p>
          </>
        )}
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
