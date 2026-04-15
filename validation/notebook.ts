import { z } from "zod";

const fileSchema = z.custom<File>((v) => v instanceof File);

export const newNotebookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorName: z.string().min(1, "Author name is required"),
  assistantVoice: z.string().min(1, "Please select an assistant voice"),
  pdfFile: fileSchema
    .nullable()
    .refine((f) => f !== null, "Please upload a PDF file")
    .refine(
      (f) => f === null || f.type === "application/pdf",
      "Only PDF files are allowed"
    )
    .refine(
      (f) => f === null || f.size <= 50 * 1024 * 1024,
      "PDF must be 50 MB or smaller"
    ),
  coverImage: fileSchema.nullable(),
});

export type NewNotebookInput = z.infer<typeof newNotebookSchema>;
