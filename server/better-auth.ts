import { Playwrite_CL_Guides } from "next/font/google";

import { env } from "@/env";
import { sendEmail } from "@/lib/email";
import { db, schema } from "@/server/db";
import { loginSchema, signupSchema } from "@/validation/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-in/email") {
        const result = loginSchema.safeParse(ctx.body);

        if (!result.success) {
          throw new APIError("BAD_REQUEST", {
            message: result.error.issues[0].message ?? "Invalid input",
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
