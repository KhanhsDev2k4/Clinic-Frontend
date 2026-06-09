"use client";

import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import { EXCEPTION_TYPE } from "@/common";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";
import { FILTER_ALL_VALUE, TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import type { DoctorScheduleExceptionResponse } from "@/interface/response";

import {
  MOCK_CURRENT_DOCTOR_PROFILE_ID,
  MOCK_DOCTOR_SCHEDULE_EXCEPTIONS,
} from "./doctorScheduleExceptionMock";

export interface DoctorScheduleExceptionFilter {
  type?: EXCEPTION_TYPE | TYPE_OF_FILTER_ALL_VALUE;
  month: number;
  year: number;
}

export interface DoctorScheduleExceptionFormPayload {
  exceptionDate: string;
  type: EXCEPTION_TYPE;
  reason: string;
}

const MOCK_KEY = "doctor-schedule-exceptions:mock";

const getMockExceptions = async () => MOCK_DOCTOR_SCHEDULE_EXCEPTIONS;

export function useDoctorScheduleExceptions(filter: DoctorScheduleExceptionFilter) {
  const currentProfile = useCurrentProfile();
  const doctorProfile = currentProfile.data?.body.doctor;
  const doctorProfileId = doctorProfile?.id;

  const swr = useSWR<DoctorScheduleExceptionResponse[]>(MOCK_KEY, getMockExceptions, {
    fallbackData: MOCK_DOCTOR_SCHEDULE_EXCEPTIONS,
  });

  const scopedMockData = useMemo(() => {
    return (swr.data ?? []).map((exception) =>
      doctorProfile && exception.doctorProfile.id === MOCK_CURRENT_DOCTOR_PROFILE_ID
        ? {
            ...exception,
            doctorProfile,
          }
        : exception
    );
  }, [doctorProfile, swr.data]);

  const exceptions = useMemo(() => {
    return scopedMockData
      .filter((exception) => exception.doctorProfile.id === doctorProfileId)
      .filter((exception) => {
        if (filter.type && filter.type !== FILTER_ALL_VALUE) {
          return exception.type === filter.type;
        }

        return true;
      })
      .filter((exception) => {
        const date = new Date(`${exception.exceptionDate}T00:00:00`);
        return date.getMonth() === filter.month && date.getFullYear() === filter.year;
      })
      .sort((a, b) => a.exceptionDate.localeCompare(b.exceptionDate));
  }, [doctorProfileId, filter.month, filter.type, filter.year, scopedMockData]);

  const allDoctorExceptions = useMemo(() => {
    return scopedMockData.filter((exception) => exception.doctorProfile.id === doctorProfileId);
  }, [doctorProfileId, scopedMockData]);

  const createException = async (payload: DoctorScheduleExceptionFormPayload) => {
    if (!doctorProfile) return;

    const exists = allDoctorExceptions.some(
      (exception) => exception.exceptionDate === payload.exceptionDate
    );

    if (exists) {
      return;
    }

    const nextException: DoctorScheduleExceptionResponse = {
      id: `exception-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      deletedAt: null,
      doctorProfile,
      ...payload,
    };

    await mutate(MOCK_KEY, [...(swr.data ?? []), nextException], false);
  };

  const updateException = async (
    id: string,
    payload: DoctorScheduleExceptionFormPayload
  ) => {
    const exists = allDoctorExceptions.some(
      (exception) => exception.id !== id && exception.exceptionDate === payload.exceptionDate
    );

    if (exists) {
      return;
    }

    await mutate(
      MOCK_KEY,
      (swr.data ?? []).map((exception) =>
        exception.id === id
          ? {
              ...exception,
              ...payload,
              updatedAt: new Date().toISOString(),
            }
          : exception
      ),
      false
    );
  };

  const deleteException = async (id: string) => {
    await mutate(
      MOCK_KEY,
      (swr.data ?? []).filter((exception) => exception.id !== id),
      false
    );
  };

  return {
    ...swr,
    exceptions,
    allDoctorExceptions,
    createException,
    updateException,
    deleteException,
  };
}
