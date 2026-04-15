"use client";

import { CoverImageDropZone } from "./_components/cover-image-dropzone";
import PdfDropZone from "./_components/pdf-dropzone";
import VoiceCard from "./_components/voice-card";
import { orpc } from "@/client/orpc";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { useUploadThing } from "@/lib/uploadthing";
import { newNotebookSchema } from "@/validation/notebook";
import { Book03Icon, QuillWrite02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// ─── Page ─────────────────────────────────────────────────────────────────────

const NewNotebookPage = () => {
  const { isPending, mutate } = useMutation(
    orpc.notebook.createNotebook.mutationOptions({
      onSuccess: () => {
        toast.success("Notebook created!");
      },
      onError: (err) => {
        toast.error(err.message ?? "Failed to create notebook");
      },
    })
  );

  const { startUpload: uploadPdf, isUploading: isPdfUploading } =
    useUploadThing("pdfUploader", {
      onUploadError: (err) => {
        toast.error(err.message ?? "PDF upload failed");
      },
    });

  const { startUpload: uploadCover, isUploading: isCoverUploading } =
    useUploadThing("coverImageUploader", {
      onUploadError: (err) => {
        toast.error(err.message ?? "Cover upload failed");
      },
    });

  const form = useForm({
    defaultValues: {
      title: "",
      authorName: "",
      assistantVoice: "tom",
      pdfFile: null as File | null,
      coverImage: null as File | null,
    },

    validators: {
      onSubmit: newNotebookSchema,
    },
    onSubmit: async ({ value }) => {
      // Validate PDF presence
      if (!value.pdfFile) {
        toast.error("Please upload a PDF file");
        return;
      }

      const toastId = toast.loading("Uploading files…");

      try {
        // Upload PDF
        const pdfRes = await uploadPdf([value.pdfFile]);
        if (!pdfRes?.[0]) throw new Error("PDF upload failed");
        const pdfUrl = pdfRes[0].ufsUrl;

        // Upload cover image (optional)
        let coverUrl: string | undefined;
        if (value.coverImage) {
          const coverRes = await uploadCover([value.coverImage]);
          coverUrl = coverRes?.[0]?.ufsUrl;
        }

        toast.success("Notebook created!");

        mutate({
          authorName: value.authorName,
          pdfUrl,
          title: value.title,
          coverImageUrl: coverUrl,
          assistantVoice: value.assistantVoice,
        });
        toast.dismiss(toastId);
      } catch (err: unknown) {
        toast.dismiss(toastId);
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    },
  });

  const isSubmitting =
    form.state.isSubmitting || isPdfUploading || isCoverUploading || isPending;

  return (
    <div className="bg-secondary/20 dark:bg-secondary mx-auto flex w-full max-w-7xl flex-1 border-x">
      <div className="bg-card flex w-full flex-1 flex-col items-center rounded-xl p-5">
        <form
          className="flex w-full max-w-xl flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <h2 className="text-2xl font-medium">Create new notebook</h2>

          {/* ── PDF Upload ── */}
          <form.Field name="pdfFile">
            {(field) => (
              <PdfDropZone
                value={field.state.value}
                onChange={(file) => field.handleChange(file)}
                error={
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                    ? String(field.state.meta.errors[0])
                    : undefined
                }
              />
            )}
          </form.Field>

          {/* ── Cover Image ── */}
          <form.Field name="coverImage">
            {(field) => (
              <CoverImageDropZone
                value={field.state.value}
                onChange={(file) => field.handleChange(file)}
              />
            )}
          </form.Field>

          {/* ── Title ── */}
          <form.Field
            name="title"
            validators={{
              onBlur: ({ value }) =>
                !value.trim() ? "Title is required" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="text-muted-foreground text-base font-medium"
                >
                  Title
                </label>
                <InputGroup>
                  <InputGroupAddon>
                    <HugeiconsIcon icon={Book03Icon} className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="title"
                    placeholder="ex. Rich Dad Poor Dad"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                    disabled={isSubmitting}
                  />
                </InputGroup>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-xs">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* ── Author Name ── */}
          <form.Field
            name="authorName"
            validators={{
              onBlur: ({ value }) =>
                !value.trim() ? "Author name is required" : undefined,
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="authorName"
                  className="text-muted-foreground text-base font-medium"
                >
                  Author Name
                </label>
                <InputGroup>
                  <InputGroupAddon>
                    <HugeiconsIcon icon={QuillWrite02Icon} className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="authorName"
                    placeholder="ex. Robert Kiyosaki"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                    disabled={isSubmitting}
                  />
                </InputGroup>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-xs">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* ── Assistant Voice ── */}
          <form.Field name="assistantVoice">
            {(field) => (
              <div className="flex flex-col gap-1">
                <label className="text-muted-foreground text-base font-medium">
                  Choose Assistant Voice
                </label>
                <RadioGroup
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v)}
                  className="flex flex-col gap-3"
                >
                  <p className="text-muted-foreground text-sm opacity-70">
                    Male Voices
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <VoiceCard
                      id="tom"
                      label="Tom"
                      description="Strong, powerful manly voice"
                      currentValue={field.state.value}
                    />
                    <VoiceCard
                      id="daniel"
                      label="Daniel"
                      description="Middle-aged male, British, authoritative"
                      currentValue={field.state.value}
                    />
                    <VoiceCard
                      id="chris"
                      label="Chris"
                      description="Male, casual & easy-going"
                      currentValue={field.state.value}
                    />
                  </div>
                  <p className="text-muted-foreground/70 text-sm">
                    Female Voices
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <VoiceCard
                      id="rachel"
                      label="Rachel"
                      description="Young female, American, calm & clear"
                      currentValue={field.state.value}
                    />
                    <VoiceCard
                      id="sarah"
                      label="Sarah"
                      description="Young female, American, soft & approachable"
                      currentValue={field.state.value}
                    />
                  </div>
                </RadioGroup>
              </div>
            )}
          </form.Field>

          {/* ── Submit ── */}
          <form.Subscribe selector={(s) => s.canSubmit}>
            {(canSubmit) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "Creating…" : "Create"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
};

export default NewNotebookPage;
