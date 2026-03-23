import { z, treeifyError } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1),

  // Better Auth
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),

  // Node Environment (optional, defaults to development)
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),

  SMTP_USER: z.email(),
  SMTP_PASS: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(treeifyError(parsed.error));
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
