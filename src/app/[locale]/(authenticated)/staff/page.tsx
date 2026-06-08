import {
  StaffTopBar,
  StaffStatsGrid,
  StaffRecentActivity,
} from "@/components/StaffDashboard";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-1 flex-col bg-gray-50/60">
      <StaffTopBar />
      <div className="flex-1 px-6 md:px-8 py-6 space-y-6">
        <StaffStatsGrid />
        <StaffRecentActivity />
      </div>
    </div>
  );
}
