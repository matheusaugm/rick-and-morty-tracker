import { cn } from "../../lib/utils";

interface FontToggleProps {
  isRickMode: boolean;
  onToggle: () => void;
  className?: string;
}

export function FontToggle({ isRickMode, onToggle, className }: FontToggleProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn(
        "mr-2 text-sm font-medium",
        isRickMode ? "font-wubba" : "font-sans"
      )}>
        {isRickMode ? "Rick Mode" : "Sans Serif"}
      </span>
      <button
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isRickMode ? "bg-green-500" : "bg-gray-200 dark:bg-gray-600"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            isRickMode ? "translate-x-5" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
} 