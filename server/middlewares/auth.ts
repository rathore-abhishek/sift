import { headers } from "next/headers";

import { auth } from "@/server/better-auth";
import { base } from "@/server/procedures/base";
import { ORPCError } from "@orpc/server";

export const authMiddleware = base.middleware(async ({ context, next }) => {
  const sessionData = await auth.api.getSession({
    headers: await headers(), // or reqHeaders if you're using the plugin
  });

  if (!sessionData?.session || !sessionData?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }

  // Adds session and user to the context
  return next({
    context: {
      session: sessionData.session,
      user: sessionData.user,
    },
  });
});
