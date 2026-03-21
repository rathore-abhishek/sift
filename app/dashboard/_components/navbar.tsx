"use client";

import { ThemeToggle } from "./theme-toggle";
import { ProfilePopover } from "@/components/common/profile-popover";
import { Logo } from "@/components/logos/logo";

export const Navbar: React.FC = () => {
  return (
    <div className="relative">
      {/* Full-width horizontal line below header */}
      <div className="bg-border absolute right-0 bottom-0 left-0 h-px w-full" />

      <header className="bg-secondary/20 dark:bg-secondary mx-auto flex max-w-7xl items-center justify-between border-x">
        <div className="bg-background flex w-full items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex gap-2">
            <ThemeToggle />
            <ProfilePopover />
          </div>
        </div>
      </header>
    </div>
  );
};
