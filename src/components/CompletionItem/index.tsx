import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

function CompletionItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm py-1">
      {done ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
      ) : (
        <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
      )}
      <span className={cn("text-xs", done ? "text-muted-foreground" : "text-foreground")}>
        {label}
      </span>
    </li>
  );
}

export default CompletionItem;