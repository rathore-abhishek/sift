import { Logo } from "@/components/logos/logo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail, Password } from "@hugeicons/core-free-icons";
import React from "react";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="w-full max-w-6xl border-x min-h-svh flex items-center justify-center">
        <div className="w-full flex p-5">
          <div className="w-1/2">
            <Logo />
            <p className="text-neutral-500">Sift - Talk to your files</p>
          </div>
          <div className="w-1/2 bg-card p-5 rounded-xl">
            <h2 className="text-xl">Welcome back!</h2>
            <p className="text-2xl">Login to your account.</p>
            <div className="space-y-3 mt-4">
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
