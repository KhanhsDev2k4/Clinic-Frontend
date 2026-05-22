"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FILTER_PATIENT_TABS, useFilterAppointmentsData } from "@/components/PatientPageTabs/hook";
import { ClipboardList, MessageSquare } from "lucide-react";
import { AppointmentList } from "@/components/PatientPageTabs/AppointmentList";

function PatientPageTabs() {
  const { data, mutateData } = useFilterAppointmentsData();

  const activeTab: FILTER_PATIENT_TABS = data?.activeTab!;

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(v: string) => {
          mutateData({
            activeTab: v as FILTER_PATIENT_TABS,
          });
        }}
        className="flex flex-col flex-1 h-full"
      >
        <div className="flex items-center justify-between shrink-0">
          <TabsList className="h-7 p-0.5">
            <TabsTrigger
              value={FILTER_PATIENT_TABS.APPOINTMENTS}
              className="h-6 px-2.5 text-xs gap-1.5 data-[state=active]:shadow-sm"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              Lịch hẹn
            </TabsTrigger>
            <TabsTrigger
              value={FILTER_PATIENT_TABS.MESSAGES}
              className="h-6 px-2.5 text-xs gap-1.5 data-[state=active]:shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Nhắn tin
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Tab panels ─────────────────────────────────────────────────── */}
        <TabsContent
          value={FILTER_PATIENT_TABS.APPOINTMENTS}
          className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden"
        >
          <AppointmentList />
        </TabsContent>

        <TabsContent
          value="messaging"
          className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden"
        >
          {/*<MessagingPatientList />*/}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default PatientPageTabs;
