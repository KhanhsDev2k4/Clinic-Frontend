"use client";

"use client";

import { Users, CalendarCheck, FileText, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function AdminStatsGrid() {
  const t = useTranslations("admin");

  const stats = [
    {
      label: t("dashboard.totalUsers"),
      value: "1,284",
      delta: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      label: t("dashboard.totalAppointments"),
      value: "3,562",
      delta: "+8%",
      icon: CalendarCheck,
      color: "emerald",
    },
    {
      label: t("dashboard.totalReports"),
      value: "946",
      delta: "+23%",
      icon: FileText,
      color: "amber",
    },
    {
      label: t("dashboard.activeToday"),
      value: "187",
      delta: "+5%",
      icon: Activity,
      color: "violet",
    },
  ];

  const colorMap: Record<string, { bg: string; ring: string; icon: string }> = {
    blue: {
      bg: "bg-blue-50",
      ring: "ring-blue-100",
      icon: "text-blue-600",
    },
    emerald: {
      bg: "bg-emerald-50",
      ring: "ring-emerald-100",
      icon: "text-emerald-600",
    },
    amber: {
      bg: "bg-amber-50",
      ring: "ring-amber-100",
      icon: "text-amber-600",
    },
    violet: {
      bg: "bg-violet-50",
      ring: "ring-violet-100",
      icon: "text-violet-600",
    },
  };

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const c = colorMap[stat.color];
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center ring-4",
                  c.bg,
                  c.ring
                )}
              >
                <Icon className={cn("w-4 h-4", c.icon)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-600 font-medium">{stat.delta}</span>{" "}
                {t("dashboard.fromLastMonth")}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
