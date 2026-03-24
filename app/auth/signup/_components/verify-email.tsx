import Link from "next/link";

import { orpc } from "@/client/orpc";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { MailOpen } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";

export const VerifyEmail = ({ email }: { email: string }) => {
  const { isPending, mutate } = useMutation(
    orpc.auth.sendVerificationEmail.mutationOptions()
  );

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-accent">
          <HugeiconsIcon icon={MailOpen} />
        </EmptyMedia>
        <EmptyTitle>Check your inbox</EmptyTitle>
        <EmptyDescription>
          We sent a verification link to{" "}
          <span className="text-foreground font-medium">{email}</span>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-col items-center gap-2">
        <Button
          className="w-full"
          variant="secondary"
          disabled={isPending}
          onClick={() => mutate({ email })}
        >
          {isPending && <Spinner />}
          Resend verification email
        </Button>
        <p className="text-muted-foreground text-sm">
          Already verified?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </EmptyContent>
    </Empty>
  );
};
