import { z } from "zod";

export const newNotebookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorName: z.string().min(1, "Author name is required"),
  assistantVoice: z.string().min(1, "Please select an assistant voice"),
  pdfFile: z
    .custom<File>((v) => v instanceof File, "Please upload a PDF file")
    .refine(
      (f) => f.type === "application/pdf",
      "Only PDF files are allowed",
    )
    .refine(
      (f) => f.size <= 50 * 1024 * 1024,
      "PDF must be 50 MB or smaller",
    ),
  coverImage: z
    .custom<File>((v) => v instanceof File)
    .nullable()
    .optional(),
});

export type NewNotebookInput = z.infer<typeof newNotebookSchema>;
