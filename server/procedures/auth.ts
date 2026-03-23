import { auth } from "../better-auth";
import { base } from "./base";
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
