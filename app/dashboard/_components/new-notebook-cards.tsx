import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const W = 280;
const H = 190;

export const NewNotebookListCard = () => {
  return (
    <div className="group border-border dark:border-accent hover:bg-accent dark:hover:bg-accent/20 flex cursor-pointer items-center gap-4 rounded-xl border border-dashed px-5 py-4 transition-all">
      <div className="border-border dark:border-accent group-hover:border-foreground/30 group-hover:dark:border-foreground/30 flex size-9 shrink-0 items-center justify-center rounded-full border border-dashed transition-all">
        <HugeiconsIcon
          icon={Plus}
          className="text-muted-foreground group-hover:text-foreground size-4 transition-colors"
        />
      </div>
      <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
        New notebook
      </span>
    </div>
  );
};

export const NewNoteBookNormalCard = () => {
  return (
    <div
      className="group border-border bg-muted/20 dark:border-accent hover:bg-accent dark:hover:bg-accent/20 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed transition-all"
      style={{ width: W, height: H }}
    >
      <div className="border-border dark:border-accent group-hover:dark:border-foreground/30 group-hover:border-foreground/30 flex size-12 items-center justify-center rounded-full border border-dashed transition-all">
        <HugeiconsIcon
          icon={Plus}
          className="text-muted-foreground group-hover:text-foreground size-5 transition-colors"
        />
      </div>
      <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
        New notebook
      </span>
    </div>
  );
};
