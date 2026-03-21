"use client";

import { useState } from "react";

import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  List,
  Plus,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Trash2,
  Pencil,
  Paperclip,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Constants ───────────────────────────────────────────────────────────────

const CLIP =
  "M 0 15 Q 0 0 15 0 L 81 0 C 97 0 100 21 118 21 L 285 21 Q 300 21 300 37 L 300 188 Q 300 200 285 200 L 15 200 Q 0 200 0 185 Z";

const W = 300;
const H = 200;

const CLOSED_STACK = [
  { y: -28, scale: 0.88, rotate: -5 },
  { y: -18, scale: 0.93, rotate: 3 },
  { y: -9, scale: 0.97, rotate: -2 },
];

const OPEN_STACK = [
  { y: -90, scale: 0.88, rotate: -7 },
  { y: -62, scale: 0.93, rotate: 2 },
  { y: -36, scale: 0.97, rotate: -2 },
];

const innerCards = [
  {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    bg: "bg-violet-100 dark:bg-violet-900/40",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    border: "border-emerald-200 dark:border-emerald-800",
  },
];

const sortOptions = [
  { label: "Most Recent", value: "most-recent" },
  { label: "Old First", value: "most-recent" },
  { label: "A to Z", value: "most-recent" },
  { label: "Z to A", value: "most-recent" },
];

const notebooks = [
  {
    id: 1,
    title: "Jaishankar Prasad: The Life and Poetry",
    sources: 19,
    updatedAt: "9 Jan 2026",
    tabColor: "bg-violet-400",
    backColor: "bg-secondary/60 dark:bg-secondary/40",
  },
  {
    id: 2,
    title: "Untitled notebook",
    sources: 0,
    updatedAt: "19 Mar 2026",
    tabColor: "bg-sky-400",
    backColor: "bg-secondary/60 dark:bg-secondary/40",
  },
  {
    id: 3,
    title: "Power Sharing: Lessons from Belgium",
    sources: 26,
    updatedAt: "21 Dec 2025",
    tabColor: "bg-amber-400",
    backColor: "bg-secondary/60 dark:bg-secondary/40",
  },
  {
    id: 4,
    title: "Untitled notebook",
    sources: 0,
    updatedAt: "3 Dec 2025",
    tabColor: "bg-rose-400",
    backColor: "bg-secondary/60 dark:bg-secondary/40",
  },
  {
    id: 5,
    title: "Biology: Cell Structure & Functions",
    sources: 11,
    updatedAt: "14 Feb 2026",
    tabColor: "bg-emerald-400",
    backColor: "bg-secondary/60 dark:bg-secondary/40",
  },
];

// ─── Notebook Folder Card ─────────────────────────────────────────────────────

function NotebookFolder({ notebook }: { notebook: (typeof notebooks)[0] }) {
  const clipId = `folder-clip-${notebook.id}`;

  return (
    <div
      className="group relative cursor-pointer"
      style={{ width: W, height: H }}
    >
      {/* Per-folder SVG clip */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={CLIP} />
          </clipPath>
        </defs>
      </svg>

      {/* Folder shape */}
      <div
        className="bg-secondary border-border absolute inset-0 border transition-colors"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {/* Tab accent line */}
        <div
          className={cn(
            "absolute top-0 left-0 h-[21px] w-[118px] opacity-60",
            notebook.tabColor
          )}
        />

        {/* Divider below tab */}
        <div className="bg-border absolute inset-x-0 top-[21px] h-px" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 pt-10">
          <p className="line-clamp-2 text-sm leading-snug font-semibold">
            {notebook.title}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <Paperclip className="text-muted-foreground size-3 shrink-0" />
            <span className="text-muted-foreground text-xs">
              {notebook.sources} sources · {notebook.updatedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="absolute top-7 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 size-3.5" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 size-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─── New Notebook Card ────────────────────────────────────────────────────────

function NewNotebookCard({ view }: { view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="group border-border bg-card/50 hover:border-primary/50 hover:bg-card flex cursor-pointer items-center gap-4 rounded-lg border border-dashed px-5 py-4 transition-all">
        <div className="border-border bg-secondary group-hover:border-primary/50 group-hover:bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg border border-dashed transition-all">
          <Plus className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
        </div>
        <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
          New notebook
        </span>
      </div>
    );
  }

  // Grid — match folder dimensions exactly
  return (
    <div
      className="group border-border bg-card/40 hover:border-primary/40 hover:bg-card/80 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed transition-all"
      style={{ width: W, height: H }}
    >
      <div className="border-border bg-secondary group-hover:border-primary/50 group-hover:bg-primary/10 flex size-12 items-center justify-center rounded-full border border-dashed transition-all">
        <Plus className="text-muted-foreground group-hover:text-primary size-5 transition-colors" />
      </div>
      <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
        New notebook
      </span>
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function NotebookListRow({ notebook }: { notebook: (typeof notebooks)[0] }) {
  return (
    <div className="group border-border bg-card hover:bg-card/80 flex cursor-pointer items-center gap-4 rounded-lg border px-5 py-4 transition-all">
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          notebook.tabColor,
          "bg-opacity-20"
        )}
      >
        <FileText className="text-foreground/70 size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{notebook.title}</p>
        <p className="text-muted-foreground text-xs">
          {notebook.updatedAt} · {notebook.sources} sources
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil className="mr-2 size-3.5" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 size-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("Most recent");

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />

      <div className="bg-secondary/20 dark:bg-secondary mx-auto flex w-full max-w-7xl flex-1 border-x">
        <div className="bg-card flex w-full flex-1 flex-col rounded-xl p-6">
          {/* ── Toolbar ── */}
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
                  <LayoutGrid className="size-3.5" />
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
                  <List className="size-3.5" />
                </Button>
              </div>

              {/* Sort */}
              <Select items={sortOptions}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" alignItemWithTrigger>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Create */}
              <Button size="sm" className="gap-1.5">
                <Plus className="size-4" />
                Create New
              </Button>
            </div>
          </div>

          {/* ── Content ── */}
          {view === "grid" ? (
            <div className="mt-6 flex flex-wrap gap-5">
              <NewNotebookCard view="grid" />
              {notebooks.map((nb) => (
                <NotebookFolder key={nb.id} notebook={nb} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-2">
              {/*<NewNotebookCard view="list" />
              {notebooks.map((nb) => (
                <NotebookListRow key={nb.id} notebook={nb} />
              ))}*/}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
