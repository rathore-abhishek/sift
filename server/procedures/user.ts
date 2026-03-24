import { auth } from "../better-auth";
import { authMiddleware } from "../middlewares/auth";
import { base } from "./base";

export const getUser = base.use(authMiddleware).handler(async ({ context }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  return session?.user;
});
