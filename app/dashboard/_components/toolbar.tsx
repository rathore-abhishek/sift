"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  LeftToRightListBulletIcon,
  GridTableIcon,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ToolbarProps {
  view: string;
  setView: (view: "grid" | "list") => void;
}

const sortOptions = [
  { label: "Most Recent", value: "most-recent" },
  { label: "Old First", value: "old-first" },
  { label: "A to Z", value: "a-to-z" },
  { label: "Z to A", value: "z-to-a" },
];

export const Toolbar: React.FC<ToolbarProps> = ({ setView, view }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">Notebooks</h1>

      <div className="flex items-center gap-2">
        {/* View toggle */}
        <div className="dark:bg-secondary flex items-center gap-0.5 rounded-lg border p-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-7 rounded-md hover:bg-neutral-200",
              view === "grid" && "dark:bg-muted/50 bg-neutral-200"
            )}
            onClick={() => setView("grid")}
          >
            <HugeiconsIcon icon={GridTableIcon} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-7 rounded-md hover:bg-neutral-200",
              view === "list" && "dark:bg-muted/50 bg-neutral-200"
            )}
            onClick={() => setView("list")}
          >
            <HugeiconsIcon icon={LeftToRightListBulletIcon} />
          </Button>
        </div>

        {/* Sort */}
        <Select items={sortOptions} defaultValue={"most-recent"}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" alignItemWithTrigger={false}>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Create */}
        <Button>
          <HugeiconsIcon icon={Plus} />
          Create New
        </Button>
      </div>
    </div>
  );
};
