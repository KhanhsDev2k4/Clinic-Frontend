"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { User, Calendar, FileText } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "user" | "appointment" | "report";
  title: string;
  description: string;
  time: string;
  status: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "user",
    title: "New user registered",
    description: "Nguyen Van A joined as Patient",
    time: "2026-06-05T10:30:00",
    status: "ACTIVE",
  },
  {
    id: "2",
    type: "appointment",
    title: "Appointment confirmed",
    description: "Dr. Tran Thi B — Nguyen Van C",
    time: "2026-06-05T09:15:00",
    status: "CONFIRMED",
  },
  {
    id: "3",
    type: "report",
    title: "Report generated",
    description: "Monthly revenue report — May 2026",
    time: "2026-06-05T08:00:00",
    status: "COMPLETED",
  },
  {
    id: "4",
    type: "user",
    title: "Doctor profile updated",
    description: "Dr. Le Van D updated specialization",
    time: "2026-06-04T16:45:00",
    status: "ACTIVE",
  },
  {
    id: "5",
    type: "appointment",
    title: "Appointment cancelled",
    description: "Pham Thi E — Dr. Hoang Van F",
    time: "2026-06-04T14:20:00",
    status: "CANCELLED",
  },
];

const typeIcon: Record<string, React.ElementType> = {
  user: User,
  appointment: Calendar,
  report: FileText,
};

const statusVariant: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-700",
  CONFIRMED: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
  PENDING: "bg-amber-50 text-amber-700",
};

export function AdminRecentActivity() {
  const t = useTranslations("admin");

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">
          {t("dashboard.recentActivity")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6">{t("dashboard.activityType")}</TableHead>
              <TableHead>{t("dashboard.activityTitle")}</TableHead>
              <TableHead>{t("dashboard.activityDesc")}</TableHead>
              <TableHead>{t("dashboard.activityTime")}</TableHead>
              <TableHead className="text-right pr-6">
                {t("dashboard.activityStatus")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockActivities.map((activity) => {
              const Icon = typeIcon[activity.type];
              return (
                <TableRow key={activity.id}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{activity.title}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {activity.description}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {formatDateTime(activity.time)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        statusVariant[activity.status] ||
                          "bg-gray-100 text-gray-600"
                      )}
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
            {mockActivities.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No recent activity
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
