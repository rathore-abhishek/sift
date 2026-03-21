"use client";
import { ThemeToggle } from "@/app/dashboard/_components/theme-toggle";
import { ProfilePopover } from "@/components/common/profile-popover";
import { Icon } from "@/components/logos/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const Navbar: React.FC = () => {
  return (
    <div className="relative">
      {/* Full-width horizontal line below header */}
      <div className="bg-border absolute right-0 bottom-0 left-0 h-px w-full" />
      <header className="mx-5 flex items-center justify-between border-x px-5 py-4">
        <div className="flex gap-2">
          <Icon className="size-9.5" />
          <Input
            className="border-none bg-transparent text-2xl font-medium dark:bg-transparent"
            value="Abhishek Rathore"
          />
        </div>
        <div className="flex gap-2.5">
          <ThemeToggle />
          <Button variant={"secondary"}>
            <HugeiconsIcon icon={Plus} /> Create notebook
          </Button>
          <ProfilePopover />
        </div>
      </header>
    </div>
  );
};
