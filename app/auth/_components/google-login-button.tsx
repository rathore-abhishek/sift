import { authClient } from "@/client/better-auth";
import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { useProgress } from "@bprogress/next";

export const GoogleLoginButton: React.FC = () => {
  const { start } = useProgress();

  function handleGoogleLogin() {
    start();
    authClient.signIn.social({ provider: "google" });
  }

  return (
    <Button
      variant={"secondary"}
      className={"w-full"}
      onClick={() => handleGoogleLogin()}
    >
      <Google />
      Continue with Google
    </Button>
  );
};
