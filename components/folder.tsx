"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { FileText, Image, Music, Video, Paperclip } from "lucide-react";
import { motion } from "motion/react";

const FOLDER_CLIP_ID = "folder-clip-sift";

interface Card {
  id: string;
  bg: string;
  border: string;
  icon: string;
  label: string;
}

const cards = [
  {
    id: "01",
    bg: "bg-blue-100",
    border: "border-blue-200",
    icon: "text-blue-500",
    label: "text-blue-800",
  },
  {
    id: "02",
    bg: "bg-violet-100",
    border: "border-violet-200",
    icon: "text-violet-500",
    label: "text-violet-800",
  },
  {
    id: "03",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    icon: "text-emerald-500",
    label: "text-emerald-800",
  },
  {
    id: "04",
    bg: "bg-rose-100",
    border: "border-rose-200",
    icon: "text-rose-500",
    label: "text-rose-800",
  },
];

const W = 200;
const H = 148;

const CLIP =
  "M 0 15 Q 0 0 15 0 L 81 0 C 97 0 100 21 118 21 L 185 21 Q 200 21 200 37 L 200 133 Q 200 148 185 148 L 15 148 Q 0 148 0 133 Z";

const CLOSED_STACK = [
  { y: -36, scale: 0.9, rotate: -6 },
  { y: -26, scale: 0.94, rotate: 3 },
  { y: -16, scale: 0.97, rotate: -2 },
  { y: -7, scale: 1.0, rotate: 4 },
];

const OPEN_STACK = [
  { y: -86, scale: 0.9, rotate: -6 },
  { y: -64, scale: 0.94, rotate: -2 },
  { y: -43, scale: 0.97, rotate: 2 },
  { y: -24, scale: 1.0, rotate: 5 },
];

function Card({
  card,
  index,
  isOpen,
}: {
  card: Card;
  index: number;
  isOpen: boolean;
}) {
  const closed = CLOSED_STACK[index];
  const open = OPEN_STACK[index];

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute h-[92%] w-full origin-bottom overflow-hidden rounded-lg border shadow-sm",
        card.bg,
        card.border
      )}
      style={{ zIndex: index + 1 }}
      animate={{
        y: isOpen ? open.y : closed.y,
        scale: isOpen ? open.scale : closed.scale,
        rotate: isOpen ? open.rotate : closed.rotate,
      }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="flex h-full flex-col p-3">
        <div className="flex items-start justify-end">
          <span className={cn("font-mono text-[8px] opacity-60", card.label)}>
            {card.id}
          </span>
        </div>
        <div className="mt-auto space-y-1 opacity-20">
          <div
            className={cn(
              "h-0.5 w-full rounded-full",
              card.icon.replace("text-", "bg-")
            )}
          />
          <div
            className={cn(
              "h-0.5 w-2/3 rounded-full",
              card.icon.replace("text-", "bg-")
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Folder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-0" style={{ perspective: "600px" }}>
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id={FOLDER_CLIP_ID} clipPathUnits="userSpaceOnUse">
            <path d={CLIP} />
          </clipPath>
        </defs>
      </svg>

      <div
        className="relative"
        style={{ width: W, height: H }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Back plate — reduced height */}
        <div
          className="dark:bg-secondary/60 border-border dark:border-trasparent absolute inset-x-0 top-0 mt-2 rounded-xl border bg-white"
          style={{ height: "90%" }}
        />

        {/* Card stack */}
        <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-10 flex h-[88%] items-end justify-center">
          {cards.map((card, i) => (
            <Card key={card.id} card={card} index={i} isOpen={isOpen} />
          ))}
        </div>

        {/* Folder face — no outline SVG */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: isOpen ? -18 : 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div
            className="absolute inset-0 h-full w-full"
            style={{ clipPath: `url(#${FOLDER_CLIP_ID})` }}
          >
            <div className="dark:bg-secondary absolute inset-0 bg-white" />

            <div className="border-border absolute inset-0 rounded-xl border dark:border-transparent" />

            <div className="absolute right-0 bottom-0 left-0 flex h-10 items-center px-3">
              <div className="flex items-center gap-1.5">
                <div className="border-border bg-muted rounded-md border p-1">
                  <Paperclip className="text-muted-foreground h-3 w-3" />
                </div>
                <span className="text-muted-foreground text-sm font-medium">
                  Notebooks
                </span>
              </div>
            </div>

            <div className="bg-border absolute top-0 right-0 left-3 h-px" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
