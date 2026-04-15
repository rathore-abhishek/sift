// ─── Voice card ───────────────────────────────────────────────────────────────
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function VoiceCard({
  id,
  label,
  description,
  currentValue,
}: {
  id: string;
  label: string;
  description: string;
  currentValue: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer flex-col rounded-lg border p-3.5 transition-all",
        currentValue === id
          ? "bg-muted dark:bg-secondary/50 border-primary/40"
          : "hover:bg-muted/50"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{label}</span>
        <RadioGroupItem value={id} id={id} />
      </div>
      <p className="text-muted-foreground text-sm tracking-tight">
        {description}
      </p>
    </label>
  );
}
