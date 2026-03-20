import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import "./globals.css";
import { BProgressProvider } from "@/components/providers/bprogress-provider";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sift",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.className,
        geistMono.variable,
        instrumentSerif.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <TanstackQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BProgressProvider>{children}</BProgressProvider>
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
