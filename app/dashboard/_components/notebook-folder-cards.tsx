"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  Paperclip,
  PencilEdit01Icon,
  Trash,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";

const notebooks = [
  {
    id: 1,
    title: "Jaishankar Prasad: The Life and Poetry",
    sources: 19,
    updatedAt: "9 Jan 2026",
    tabColor: "bg-violet-400",
  },
  {
    id: 2,
    title: "Untitled notebook",
    sources: 0,
    updatedAt: "19 Mar 2026",
    tabColor: "bg-sky-400",
  },
  {
    id: 3,
    title: "Power Sharing: Lessons from Belgium",
    sources: 26,
    updatedAt: "21 Dec 2025",
    tabColor: "bg-amber-400",
  },
  {
    id: 4,
    title: "Untitled notebook",
    sources: 0,
    updatedAt: "3 Dec 2025",
    tabColor: "bg-rose-400",
  },
  {
    id: 5,
    title: "Biology: Cell Structure & Functions",
    sources: 11,
    updatedAt: "14 Feb 2026",
    tabColor: "bg-emerald-400",
  },
];

const CLIP =
  "M 0 15 Q 0 0 15 0 L 81 0 C 97 0 100 21 118 21 L 265 21 Q 280 21 280 37 L 280 178 Q 280 190 265 190 L 15 190 Q 0 190 0 175 Z";

const W = 280;
const H = 190;

const MINI_CLIP =
  "M 0 3 Q 0 0 3 0 L 12 0 C 15 0 16 4 18 4 L 28 4 Q 30 4 30 6 L 30 19 Q 30 20 28 20 L 2 20 Q 0 20 0 18 Z";

const MINI_W = 30;
const MINI_H = 20;

// ─── Responsive folder wrapper ────────────────────────────────────────────────

function useScaledFolder(targetW: number) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / targetW);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [targetW]);

  return { outerRef, scale };
}

// ─── Notebook Folder Card ─────────────────────────────────────────────────────

export const NotebookFolderCard = ({
  notebook,
}: {
  notebook: (typeof notebooks)[0];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const clipId = `folder-clip-${notebook.id}`;
  const { outerRef, scale } = useScaledFolder(W);

  return (
    <div
      ref={outerRef}
      className="group relative w-full cursor-pointer"
      style={{ aspectRatio: `${W}/${H}`, perspective: "600px" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={CLIP} />
          </clipPath>
        </defs>
      </svg>

      {/* Scaled inner — fixed pixel size, CSS-scaled to fill parent */}
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      >
        {/* Back plate */}
        <motion.div
          className="border-border bg-secondary/10 dark:bg-secondary/40 absolute inset-x-0 top-0 mt-2 rounded-xl border"
          style={{ height: "90%" }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* File cards */}
        <div className="pointer-events-none absolute inset-x-4 bottom-3 z-10 flex h-[80%] items-end">
          {[
            { rotate: -4, delay: 0 },
            { rotate: 1, delay: 0.04 },
            { rotate: -1, delay: 0.08 },
          ].map((file, i) => (
            <motion.div
              key={i}
              className="absolute w-full origin-bottom rounded-md bg-black/20 shadow-sm dark:bg-white/15"
              style={{ height: "85%", zIndex: i + 1, rotate: file.rotate }}
              animate={{
                y: isOpen ? -42 - i * 10 : 0,
                opacity: isOpen ? 0.5 - i * 0.1 : 0,
              }}
              transition={{
                duration: 0.35,
                ease: [0.2, 0.8, 0.2, 1],
                delay: file.delay,
              }}
            />
          ))}
        </div>

        {/* Folder face */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: isOpen ? -18 : 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div
            className="absolute inset-0 h-full w-full border"
            style={{ clipPath: `url(#${clipId})` }}
          >
            <div className="bg-accent absolute inset-0" />
            <div
              className={cn(
                "absolute top-0 left-0 h-[21px] w-[118px] opacity-60",
                notebook.tabColor
              )}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 pt-10">
              <p className="line-clamp-2 text-sm leading-snug font-semibold">
                {notebook.title}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <HugeiconsIcon
                  icon={Paperclip}
                  className="text-muted-foreground size-3 shrink-0"
                />
                <span className="text-muted-foreground text-xs">
                  {notebook.sources} sources · {notebook.updatedAt}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three-dot menu */}
        <div className="absolute top-7 right-3 z-30">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HugeiconsIcon icon={MoreHorizontal} />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <HugeiconsIcon
                  icon={PencilEdit01Icon}
                  className="mr-2 size-3.5"
                />{" "}
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <HugeiconsIcon icon={Trash} className="mr-2 size-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

// ─── Mini Folder Icon ─────────────────────────────────────────────────────────

function MiniFolderIcon({
  notebook,
  isOpen,
}: {
  notebook: (typeof notebooks)[0];
  isOpen: boolean;
}) {
  const clipId = `mini-folder-clip-${notebook.id}`;

  return (
    <div
      className="relative shrink-0"
      style={{ width: MINI_W, height: MINI_H, perspective: "200px" }}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={MINI_CLIP} />
          </clipPath>
        </defs>
      </svg>

      {/* Back plate */}
      <motion.div
        className={cn("absolute inset-x-0 top-0 rounded-sm", notebook.tabColor)}
        style={{ height: "88%" }}
        animate={{ opacity: isOpen ? 0.15 : 0.07 }}
        transition={{ duration: 0.2 }}
      />

      {/* File cards */}
      <div className="pointer-events-none absolute inset-x-0.5 bottom-0 z-10 flex h-[78%] items-end">
        {[
          { rotate: -3, delay: 0 },
          { rotate: 1, delay: 0.04 },
          { rotate: -1, delay: 0.08 },
        ].map((file, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-full origin-bottom rounded-sm",
              notebook.tabColor
            )}
            style={{ height: "80%", zIndex: i + 1 }}
            animate={{
              y: isOpen ? -7 - i * 2 : 0,
              opacity: isOpen ? 0.25 - i * 0.06 : 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.2, 0.8, 0.2, 1],
              delay: file.delay,
            }}
          />
        ))}
      </div>

      {/* Folder face */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX: isOpen ? -18 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: `url(#${clipId})` }}
        >
          <div
            className={cn("absolute inset-0 opacity-20", notebook.tabColor)}
          />
          <div
            className={cn(
              "absolute top-0 left-0 h-[4px] w-[18px] opacity-50",
              notebook.tabColor
            )}
          />
          <div className="bg-border absolute inset-x-0 top-[4px] h-px" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

export function NotebookListRow({
  notebook,
}: {
  notebook: (typeof notebooks)[0];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr
      className="group border-border hover:bg-accent/50 cursor-pointer border-b transition-colors last:border-b-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <td className="px-4 py-3">
        <MiniFolderIcon notebook={notebook} isOpen={isOpen} />
      </td>
      <td className="px-4 py-3">
        <p className="text-sm font-semibold">{notebook.title}</p>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <p className="text-muted-foreground text-xs">{notebook.updatedAt}</p>
      </td>
      <td className="hidden px-4 py-3 sm:table-cell">
        <div className="flex items-center gap-1.5">
          <HugeiconsIcon
            icon={Paperclip}
            className="text-muted-foreground size-3 shrink-0"
          />
          <span className="text-muted-foreground text-xs tabular-nums">
            {notebook.sources} sources
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <HugeiconsIcon icon={PencilEdit01Icon} />
          </Button>
          <Button
            variant="destructive"
            size="icon-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <HugeiconsIcon icon={Trash} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
