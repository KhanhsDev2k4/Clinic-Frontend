import { AdminTopBar } from "./AdminTopBar";
import { AdminStatsGrid } from "./AdminStatsGrid";
import { AdminRecentActivity } from "./AdminRecentActivity";

export default function AdminDashboard() {
  return (
    <div className="flex h-full w-full flex-1 flex-col bg-gray-50/60">
      <AdminTopBar />
      <div className="flex-1 px-6 md:px-8 py-6 space-y-6">
        <AdminStatsGrid />
        <AdminRecentActivity />
      </div>
    </div>
  );
}
