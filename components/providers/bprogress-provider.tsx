"use client";
import { ProgressProvider } from "@bprogress/next/app";

interface BProgressProvider {
  children: React.ReactNode;
}

export const BProgressProvider: React.FC<BProgressProvider> = ({
  children,
}) => {
  return (
    <ProgressProvider
      color="var(--color-primary)"
      height="2px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
