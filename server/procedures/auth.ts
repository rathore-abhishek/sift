import { base } from "./base";
import { auth } from "@/server/better-auth";
import * as authSchema from "@/validation/auth";

export const signIn = base
  .input(authSchema.loginSchema)
  .handler(async ({ input }) => {
    await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
        callbackURL: "/dashboard",
      },
    });
  });

export const signUp = base
  .input(authSchema.signupSchema)
  .handler(async ({ input }) => {
    await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        callbackURL: "/dashboard",
      },
    });
  });

export const sendVerificationEmail = base
  .input(authSchema.emailVerificationSchema)
  .handler(async ({ input }) => {
    await auth.api.sendVerificationEmail({ body: { email: input.email } });
  });
