import { base } from "./base";
import { auth } from "@/server/better-auth";
import { z } from "zod";

export const signIn = base
  .input(
    z.object({
      email: z.email(),
      password: z.regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    })
  )
  .handler(
    async ({
      context,
      input,
      errors,
      lastEventId,
      path,
      procedure,
      signal,
    }) => {
      // auth.api.signInEmail({})
    }
  );
