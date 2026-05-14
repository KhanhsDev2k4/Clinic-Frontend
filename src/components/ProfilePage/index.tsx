"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GENDER, BLOOD_TYPE } from "@/common";
import { BasicInfoFormValues } from "@/components/BasicInfoForm/config";
import { MedicalInfoFormValues } from "@/components/MedicalInfoForm/config";
import { BasicInfoForm } from "@/components/BasicInfoForm";
import { MedicalInfoForm } from "@/components/MedicalInfoForm";

const EMPTY_BASIC: BasicInfoFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  gender: GENDER.MALE,
  dateOfBirth: new Date(),
  avatarUrl: "",
};

const EMPTY_MEDICAL = (userId: string): MedicalInfoFormValues => ({
  userId,
  bloodType: BLOOD_TYPE.O_POSITIVE,
  address: "",
  insuranceNumber: "",
  allergies: "",
  chronicDiseases: "",
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <main className="min-h-screen w-xl flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg">
        <Tabs defaultValue="basic">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="basic" className="flex-1">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex-1">
              Medical Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <BasicInfoForm />
          </TabsContent>
          <TabsContent value="medical">
            <MedicalInfoForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
