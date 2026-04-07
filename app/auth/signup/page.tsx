"use client";

import { useState } from "react";

import Link from "next/link";

import { GoogleLoginButton } from "../_components/google-login-button";
import { VerifyEmail } from "./_components/verify-email";
import { authClient } from "@/client/better-auth";
import Folder from "@/components/folder";
import { Logo } from "@/components/logos/logo";
import Scale from "@/components/scale";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { SignupInput, signupSchema } from "@/validation/auth";
import {
  Mail,
  Password,
  User,
  Eye,
  EyeOff,
  Tick,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const passwordRules = [
  { label: "Min 8 characters", test: (v: string) => v.length >= 8 },
  {
    label: "At least 1 uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    label: "At least 1 lowercase letter",
    test: (v: string) => /[a-z]/.test(v),
  },
  { label: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "At least 1 special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

// ── Main page ────────────────────────────────────────────────────────────────
const SignUpPage = () => {
  const [show, setShow] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" } as SignupInput,
    validators: { onSubmit: signupSchema },
    onSubmit: async ({ value }) => {
      mutate({
        email: value.email,
        name: value.name,
        password: value.password,
      });
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/dashboard",
      });
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      setVerifyEmail(form.getFieldValue("email"));
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return (
    <div className="relative min-h-svh overflow-clip">
      <div className="relative mx-auto max-w-7xl">
        <Scale count={50} direction="left" />
        <Scale count={50} direction="right" />
      </div>
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
                {/* ── swap between form and verify screen ── */}

                {verifyEmail ? (
                  <VerifyEmail email={verifyEmail} />
                ) : (
                  <>
                    <div className="text-center">
                      <h2 className="text-muted-foreground text-xl">
                        Get started!
                      </h2>
                      <p className="text-2xl">Create your account.</p>
                    </div>
                    <div className="mt-4 w-full space-y-3">
                      {/* Name */}
                      <form.Field name="name">
                        {(field) => (
                          <div>
                            <InputGroup>
                              <InputGroupAddon align="inline-start">
                                <HugeiconsIcon icon={User} />
                              </InputGroupAddon>
                              <InputGroupInput
                                placeholder="Name"
                                disabled={isPending}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                              />
                            </InputGroup>
                            {field.state.meta.isTouched &&
                              field.state.meta.errors[0] && (
                                <p className="text-destructive mt-1 text-sm">
                                  {field.state.meta.errors[0].message}
                                </p>
                              )}
                          </div>
                        )}
                      </form.Field>

                      {/* Email */}
                      <form.Field name="email">
                        {(field) => (
                          <div>
                            <InputGroup>
                              <InputGroupAddon align="inline-start">
                                <HugeiconsIcon icon={Mail} />
                              </InputGroupAddon>
                              <InputGroupInput
                                placeholder="Email"
                                disabled={isPending}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                              />
                            </InputGroup>
                            {field.state.meta.isTouched &&
                              field.state.meta.errors[0] && (
                                <p className="text-destructive mt-1 text-sm">
                                  {field.state.meta.errors[0].message}
                                </p>
                              )}
                          </div>
                        )}
                      </form.Field>

                      {/* Password */}
                      <form.Field name="password">
                        {(field) => (
                          <div>
                            <InputGroup>
                              <InputGroupAddon align="inline-start">
                                <HugeiconsIcon icon={Password} />
                              </InputGroupAddon>
                              <InputGroupAddon
                                className="hover:text-foreground cursor-pointer transition-colors duration-200"
                                align="inline-end"
                                onClick={() => setShow(!show)}
                              >
                                <HugeiconsIcon icon={show ? Eye : EyeOff} />
                              </InputGroupAddon>
                              <InputGroupInput
                                placeholder="Password"
                                disabled={isPending}
                                type={show ? "text" : "password"}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                              />
                            </InputGroup>
                            <ul className="mt-2 flex flex-col gap-0.5">
                              {passwordRules.map((rule) => {
                                const passed = rule.test(field.state.value);
                                return (
                                  <li
                                    key={rule.label}
                                    className="flex w-full items-center justify-between"
                                  >
                                    <p
                                      className={`text-xs transition-colors duration-200 ${
                                        !passed && field.state.meta.isTouched
                                          ? "text-destructive"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {rule.label}
                                    </p>
                                    <HugeiconsIcon
                                      icon={Tick}
                                      className={`size-4 transition-colors duration-200 ${
                                        passed
                                          ? "text-lime-500"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </form.Field>

                      <Button
                        className="w-full"
                        disabled={isPending}
                        onClick={() => form.handleSubmit()}
                      >
                        {isPending && <Spinner />}
                        Sign Up
                      </Button>

                      <div className="flex items-center">
                        <div className="bg-border h-px w-1/2 dark:bg-neutral-700" />
                        <span className="text-muted-foreground px-2 text-xs">
                          OR
                        </span>
                        <div className="bg-border h-px w-1/2 dark:bg-neutral-700" />
                      </div>

                      <GoogleLoginButton />

                      <p className="text-muted-foreground text-center text-sm">
                        Already have an account?{" "}
                        <Link
                          href="/auth/login"
                          className="text-primary hover:underline"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  </>
                )}
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
