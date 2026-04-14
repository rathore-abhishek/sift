"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "./theme-toggle";
import { ProfilePopover } from "@/components/common/profile-popover";
import { Logo } from "@/components/logos/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Full-width horizontal line below header */}
      <div className="bg-border absolute right-0 bottom-0 left-0 h-px w-full" />

      <header className="bg-secondary/20 dark:bg-secondary mx-auto flex max-w-7xl items-center justify-between border-x">
        <div className="bg-background flex w-full items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1">
              <Button
                render={<Link href={"/dashboard"} />}
                variant={"ghost"}
                className={cn(
                  "text-muted-foreground",
                  pathname === "/dashboard" &&
                    "text-foreground hover:bg-secondary/10 bg-secondary/10 dark:bg-muted dark:hover:bg-muted"
                )}
              >
                Library
              </Button>
              <Button
                render={<Link href={"/dashboard/notebook/new"} />}
                variant={"ghost"}
                className={cn(
                  "text-muted-foreground",
                  pathname === "/dashboard/notebook/new" &&
                    "text-foreground hover:bg-secondary/10 bg-secondary/10 dark:bg-muted dark:hover:bg-muted"
                )}
              >
                Add New
              </Button>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <ProfilePopover />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
