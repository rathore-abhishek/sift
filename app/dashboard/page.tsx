"use client";

import { useState } from "react";

import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import {
  NewNotebookListCard,
  NewNoteBookNormalCard,
} from "./_components/new-notebook-cards";
import {
  NotebookFolderCard,
  NotebookListRow,
} from "./_components/notebook-folder-cards";
import { Toolbar } from "./_components/toolbar";

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

const DashboardPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />

      <div className="bg-secondary/20 dark:bg-secondary mx-auto flex w-full max-w-7xl flex-1 border-x">
        <div className="bg-card flex w-full flex-1 flex-col rounded-xl p-5">
          <Toolbar view={view} setView={setView} />

          {/* ── Content ── */}
          {view === "grid" ? (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <NewNoteBookNormalCard />
              {notebooks.map((nb) => (
                <NotebookFolderCard key={nb.id} notebook={nb} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-2">
              <NewNotebookListCard />

              {/* Table wrapper */}
              <div className="border-border bg-accent/30 overflow-hidden rounded-xl border">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="border-border border-b">
                        <th className="text-muted-foreground px-4 py-2 text-left text-xs font-medium">
                          #
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left text-xs font-medium">
                          Name
                        </th>
                        <th className="text-muted-foreground hidden px-4 py-2 text-left text-xs font-medium md:table-cell">
                          Last updated
                        </th>
                        <th className="text-muted-foreground hidden px-4 py-2 text-left text-xs font-medium sm:table-cell">
                          Sources
                        </th>
                        <th className="text-muted-foreground px-4 py-2 text-left text-xs font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notebooks.map((nb) => (
                        <NotebookListRow key={nb.id} notebook={nb} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
