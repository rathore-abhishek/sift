"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (
        document as Document & {
          startViewTransition: (callback: () => void) => void;
        }
      ).startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <HugeiconsIcon
        icon={Sun}
        className="text-muted-foreground hidden size-5 dark:block"
      />
      <HugeiconsIcon
        icon={Moon}
        className="text-muted-foreground block size-5 dark:hidden"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
