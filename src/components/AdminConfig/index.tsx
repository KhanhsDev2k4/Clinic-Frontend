"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import SpecialtyTable from "./SpecialtyTable";
import ServiceTable from "./ServiceTable";
import DoctorTable from "./DoctorTable";

type TabKey = "specialties" | "services" | "doctors";

const TABS: { key: TabKey; label: string }[] = [
  { key: "specialties", label: "Specialties" },
  { key: "services", label: "Services" },
  { key: "doctors", label: "Doctors" },
];

export default function AdminConfig() {
  const [active, setActive] = useState<TabKey>("specialties");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Configuration</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage specialties, services, and doctors.
        </p>
      </div>

      <div className="flex items-center gap-1 border-b">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
              active === tab.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {active === "specialties" && <SpecialtyTable />}
        {active === "services" && <ServiceTable />}
        {active === "doctors" && <DoctorTable />}
      </div>
    </div>
  );
}
