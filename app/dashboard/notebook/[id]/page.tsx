"use client";
import { useEffect, useRef, useState } from "react";

import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  PanelLeftIcon,
  PanelRightIcon,
  Send,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion, Transition } from "motion/react";

const spring: Transition = { type: "spring", stiffness: 350, damping: 35 };

const panelTransition: Transition = {
  width: { type: "spring", stiffness: 350, damping: 35 },
  opacity: { duration: 0.2, ease: "easeInOut" },
};

const closedPanelTransition: Transition = {
  width: { type: "spring", stiffness: 350, damping: 35 },
  opacity: { duration: 0.1, ease: "easeIn" },
};

const NotebookPage = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [value, setValue] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // handle submit
    }
  };

  const canSubmit = value.trim().length > 0;

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <div className="bg-secondary/20 dark:bg-secondary mx-5 flex flex-1 flex-row gap-0">
        <motion.div
          animate={{
            width: isLeftOpen ? "25%" : "fit-content",
            // opacity: isLeftOpen ? 1 : 0,
          }}
          transition={isLeftOpen ? panelTransition : closedPanelTransition}
          className="bg-card overflow-hidden rounded-xl border-x dark:border-neutral-700"
          style={{ flexShrink: 0 }}
        >
          <div className="flex items-center border-b px-5 py-4 dark:border-neutral-700">
            <AnimatePresence initial={false}>
              {isLeftOpen && (
                <motion.h3
                  key="sources-label"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="text-muted-foreground overflow-hidden whitespace-nowrap"
                >
                  Sources
                </motion.h3>
              )}
            </AnimatePresence>
            <button
              className="ml-auto cursor-pointer"
              onClick={() => setIsLeftOpen(!isLeftOpen)}
            >
              <HugeiconsIcon
                icon={PanelLeftIcon}
                className="text-muted-foreground my-0.5 size-5"
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          layout
          transition={spring}
          className="bg-card flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl dark:border-neutral-700"
        >
          <div className="flex items-center border-b px-5 py-4 dark:border-neutral-700">
            <h3 className="text-muted-foreground flex-1 text-center">Chat</h3>

            <motion.button
              animate={{
                width: isRightOpen ? 0 : 28,
                opacity: isRightOpen ? 0 : 1,
                marginLeft: isRightOpen ? 0 : 8,
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 35 },
                opacity: {
                  duration: 0.15,
                  ease: "easeOut",
                  delay: isRightOpen ? 0 : 0.1,
                },
                marginLeft: { type: "spring", stiffness: 350, damping: 35 },
              }}
              className="cursor-pointer overflow-hidden disabled:pointer-events-none disabled:opacity-10"
              style={{ flexShrink: 0 }}
              onClick={() => setIsRightOpen(true)}
            >
              <HugeiconsIcon
                icon={PanelRightIcon}
                className="text-muted-foreground size-5"
              />
            </motion.button>
          </div>

          {/* Scrollable messages area */}
          <div className="flex-1 overflow-y-auto" />

          {/* Input pinned to bottom */}
          <div className="px-4 py-4">
            <div className="border-border dark:bg-input/10 focus-within:bg-card flex flex-col rounded-2xl border bg-transparent px-1 py-1 transition-colors">
              {/* Textarea */}
              <Textarea
                ref={textareaRef}
                rows={1}
                onKeyDown={handleKeyDown}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask anything..."
                className="min-h-0 resize-none border-0 bg-transparent px-3 py-2.5 text-sm shadow-none outline-none focus-visible:ring-0 dark:bg-transparent"
                style={{ maxHeight: 200 }}
              />

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-2 pt-1 pb-1.5">
                <p className="text-muted-foreground/50 text-xs">
                  ↵ send · ⇧↵ newline
                </p>
                <Button
                  size="icon"
                  variant={"secondary"}
                  className={cn("rounded-xl")}
                  disabled={!canSubmit}
                >
                  <HugeiconsIcon icon={SentIcon} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            width: isRightOpen ? "25%" : "fit-content",
          }}
          transition={isRightOpen ? panelTransition : closedPanelTransition}
          className="bg-card overflow-hidden rounded-xl border-x dark:border-neutral-700"
          style={{ flexShrink: 0 }}
        >
          <div className="flex items-center border-b px-5 py-4 dark:border-neutral-700">
            <AnimatePresence initial={false}>
              {isRightOpen && (
                <motion.h3
                  key="sources-label"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="text-muted-foreground overflow-hidden whitespace-nowrap"
                >
                  Studio
                </motion.h3>
              )}
            </AnimatePresence>{" "}
            <button
              className="ml-auto cursor-pointer"
              onClick={() => setIsRightOpen(!isRightOpen)}
            >
              <HugeiconsIcon
                icon={PanelRightIcon}
                className="text-muted-foreground my-0.5 size-5"
              />
            </button>
          </div>
        </motion.div>
      </div>
      <div className="border-t px-5">
        <div className="w-full border-x py-1">
          <p className="text-muted-foreground text-center text-xs">
            Sift can be inaccurate; please double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
