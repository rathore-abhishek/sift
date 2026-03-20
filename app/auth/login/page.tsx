import React from "react";

import { Logo } from "@/components/logos/logo";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Mail, Password } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex min-h-svh w-full max-w-6xl items-center justify-center border-x">
        <div className="flex w-full p-5">
          <div className="w-1/2">
            <Logo />
            <p className="text-neutral-500">Sift - Talk to your files</p>
          </div>
          <div className="bg-card w-1/2 rounded-xl p-5">
            <h2 className="text-xl">Welcome back!</h2>
            <p className="text-2xl">Login to your account.</p>
            <div className="mt-4 space-y-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
