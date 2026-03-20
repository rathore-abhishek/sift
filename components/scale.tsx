import { cn } from "@/lib/utils";

const Scale = ({
  count = 10,
  direction = "left",
}: {
  count?: number;
  direction?: "left" | "right";
}) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => {
        return (
          <div
            key={i}
            className={cn(
              "text-foreground/10 absolute inline-flex gap-1 text-xs font-medium",
              direction === "left"
                ? "right-full mr-1"
                : "left-full ml-1 flex-row-reverse"
            )}
            style={{
              top:
                i === 0
                  ? "calc(var(--spacing) * 5)"
                  : `calc(var(--spacing) * ${i * 15})`,
            }}
          >
            <p className="rotate-90">{i * 50}</p>
            <p>-</p>
          </div>
        );
      })}
    </div>
  );
};

export default Scale;
