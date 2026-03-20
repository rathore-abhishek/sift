import Link from "next/link";

import Folder from "@/components/folder";
import { Google } from "@/components/icons/google";
import { Logo } from "@/components/logos/logo";
import Scale from "@/components/scale";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Mail, Password, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const SignUpPage = () => {
  return (
    <div className="relative min-h-svh overflow-clip">
      <div className="relative mx-auto max-w-7xl">
        <Scale count={50} direction="left" />
        <Scale count={50} direction="right" />
      </div>{" "}
      <div className="relative flex min-h-svh items-center justify-center overflow-clip">
        <div className="relative flex min-h-svh w-full max-w-7xl flex-col items-center justify-center border-x">
          <div className="pointer-events-none absolute inset-y-0 w-full max-w-2xl">
            <div className="bg-border absolute inset-y-0 left-0 w-px" />
            <div className="bg-border absolute inset-y-0 right-0 w-px" />
          </div>
          <div className="bg-border h-px w-full" />
          <div className="bg-secondary/20 dark:bg-secondary w-full max-w-2xl">
            <div className="border-border bg-card flex w-full max-w-2xl rounded-xl border-x p-10">
              <div className="relative w-1/2">
                <Logo />
                <p className="text-neutral-500">
                  Sift - Talk to your files with ease.
                </p>
                <Folder />
              </div>
              <div className="w-1/2 rounded-xl">
                <div className="text-center">
                  <h2 className="text-muted-foreground text-xl">
                    Welcome back!
                  </h2>
                  <p className="text-2xl">Login to your account.</p>
                </div>
                <div className="mt-4 w-full space-y-3">
                  <InputGroup>
                    <InputGroupAddon align={"inline-start"}>
                      <HugeiconsIcon icon={User} />
                    </InputGroupAddon>
                    <InputGroupInput />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon align={"inline-start"}>
                      <HugeiconsIcon icon={Mail} />
                    </InputGroupAddon>
                    <InputGroupInput />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon align={"inline-start"}>
                      <HugeiconsIcon icon={Password} />
                    </InputGroupAddon>
                    <InputGroupInput />
                  </InputGroup>
                  <Button className={"w-full"}>SignUp</Button>
                  <Separator orientation="horizontal" />
                  <Button variant={"secondary"} className={"w-full"}>
                    <Google />
                    Continue with Google
                  </Button>
                  <p className="text-muted-foreground text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href={"/auth/login"}
                      className="text-primary hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-border h-px w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
