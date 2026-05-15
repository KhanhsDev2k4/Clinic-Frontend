import { Badge } from "@/components/ui/badge";
import { APPOINTMENT_STATUS } from "@/common";
import { statusConfig } from "@/components/Appointments/StatusBadge/config";

function StatusBadge({ status }: { status: APPOINTMENT_STATUS }) {
  const { label, className } = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-1 font-medium transition-colors ${className}`}
    >
      {label}
    </Badge>
  );
}

export default StatusBadge;
