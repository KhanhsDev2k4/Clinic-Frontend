import { cn } from "@/lib/utils";
import CompletionItem from "@/components/CompletionItem";

function ProfileCompletion({
  emailVerified,
  phoneVerified,
  hasPatient,
}: {
  emailVerified: boolean;
  phoneVerified: boolean;
  hasPatient: boolean;
}) {
  const items = [
    { label: "Email verified", done: emailVerified },
    { label: "Phone number verified", done: phoneVerified },
    { label: "Medical information completed", done: hasPatient },
  ];

  const completed = items.filter((i) => i.done).length;
  const pct = Math.round((completed / items.length) * 100);

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Profile Completion
        </span>

        <span className="text-xs font-semibold tabular-nums text-foreground">{pct}%</span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            pct === 100 ? "bg-emerald-500" : "bg-blue-500"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-0.5">
        {items.map((item) => (
          <CompletionItem key={item.label} done={item.done} label={item.label} />
        ))}
      </ul>
    </div>
  );
}
export default ProfileCompletion;
