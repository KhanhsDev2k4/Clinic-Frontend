import {
  Calendar,
  CheckCircle2,
  Clock,
  Minus,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppointmentStatistics } from "@/components/AppoinmentManagement/useAppointmentStatistics";
import NumberFlow from "@number-flow/react";

interface StatItem {
  value: number;
  lastMonth: number;
  delta: number;
  deltaPercent: number;
}

interface StatCardProps {
  label: string;
  stat: StatItem | undefined;
  icon: React.ReactNode;
  iconBg: string;
  isLoading: boolean;
}

function DeltaBadge({ delta, deltaPercent }: { delta: number; deltaPercent: number }) {
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  if (isNeutral) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
        <Minus className="h-2.5 w-2.5" />
        0%
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
      }`}
    >
      {isPositive ? (
        <TrendingUp className="h-2.5 w-2.5" />
      ) : (
        <TrendingDown className="h-2.5 w-2.5" />
      )}
      {isPositive ? "+" : ""}
      {deltaPercent.toFixed(1)}%
    </span>
  );
}

function StatCard({ label, stat, icon, iconBg, isLoading }: StatCardProps) {
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardContent className="py-0">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-lg ${iconBg}`}>{icon}</div>
          {!isLoading && stat && <DeltaBadge delta={stat.delta} deltaPercent={stat.deltaPercent} />}
        </div>

        <p className="text-xs text-slate-500 mb-1">{label}</p>

        <NumberFlow
          value={stat?.value ?? 0}
          className="text-2xl font-semibold text-slate-800 leading-none mb-1"
        />

        {!isLoading && stat && (
          <p className="text-[11px] text-slate-400">
            {stat.delta >= 0 ? "+" : ""}
            {stat.delta} so với tháng trước ({stat.lastMonth})
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function AppointmentStatCards() {
  const { data, isLoading } = useAppointmentStatistics();
  const statistics = data?.body;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        label="Tổng lịch hẹn"
        stat={statistics?.totalAppointments}
        icon={<Calendar className="h-4 w-4 text-blue-600" />}
        iconBg="bg-blue-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Hoàn thành"
        stat={statistics?.completed}
        icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
        iconBg="bg-emerald-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Đã huỷ"
        stat={statistics?.cancelled}
        icon={<XCircle className="h-4 w-4 text-red-500" />}
        iconBg="bg-red-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Chờ xác nhận"
        stat={statistics?.pending}
        icon={<Clock className="h-4 w-4 text-amber-600" />}
        iconBg="bg-amber-50"
        isLoading={isLoading}
      />
    </div>
  );
}
