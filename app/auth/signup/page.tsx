"use client";
import { useState } from "react";

import Link from "next/link";

import { GoogleLoginButton } from "../_components/google-login-button";
import Folder from "@/components/folder";
import { Logo } from "@/components/logos/logo";
import Scale from "@/components/scale";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useProgress } from "@bprogress/next";
import { Mail, Password, User, Eye, EyeOff } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const SignUpPage = () => {
  const [show, setShow] = useState();

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
          <div className="mb-2 flex flex-col items-center justify-center sm:hidden">
            <Logo />
            <p className="text-neutral-500">Talk to your files with ease.</p>
          </div>
          <div className="bg-border hidden h-px w-full sm:block" />
          <div className="sm:bg-secondary/20 sm:dark:bg-secondary w-full max-w-2xl bg-transparent px-5 sm:px-0">
            <div className="border-border bg-card flex w-full max-w-2xl flex-col rounded-xl border-x p-10 sm:flex-row">
              <div className="relative hidden w-1/2 sm:block">
                <Logo />
                <p className="text-neutral-500">
                  Sift - Talk to your files with ease.
                </p>
                <Folder />
              </div>
              <div className="w-full rounded-xl sm:w-1/2">
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
                    <InputGroupInput placeholder="Name" />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon align={"inline-start"}>
                      <HugeiconsIcon icon={Mail} />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Email" />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon align={"inline-start"}>
                      <HugeiconsIcon icon={Password} />
                    </InputGroupAddon>
                    <InputGroupAddon
                      className="cursor-pointer transition-colors duration-200 hover:text-white"
                      align="inline-end"
                      onClick={() => setShow(!show)}
                    >
                      <HugeiconsIcon icon={show ? Eye : EyeOff} />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Password" />
                  </InputGroup>
                  <Button className={"w-full"}>SignUp</Button>
                  <div className="flex items-center">
                    <div className="bg-border h-px w-1/2 dark:bg-neutral-700"></div>
                    <span className="text-muted-foreground px-2 text-xs">
                      OR
                    </span>
                    <div className="bg-border h-px w-1/2 dark:bg-neutral-700"></div>
                  </div>
                  <GoogleLoginButton />
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
          <div className="bg-border hidden h-px w-full sm:block" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
