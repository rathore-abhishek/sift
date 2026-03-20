"use client";
import React from "react";

import { getQueryClient } from "@/lib/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

export const TanstackQueryProvider: React.FC<TanstackQueryProviderProps> = ({
  children,
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
