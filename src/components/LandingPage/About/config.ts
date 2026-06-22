import { ApiResponse } from "@/hooks/global";
import type { StaticsTicsLandingResponse } from "@/interface/response";
import { apiBaseUrl } from "@/lib/axiosInstance";

interface LandingStaticsApiBody {
  trustedPatients: number;
  experience?: number;
  experienceYears?: number;
  specialistDoctors: number;
  satisfaction?: number;
  satisfactionRate?: number;
}

function isApiResponse(value: unknown): value is ApiResponse<LandingStaticsApiBody> {
  return typeof value === "object" && value !== null && "body" in value;
}

export async function fetchLandingStatics(): Promise<StaticsTicsLandingResponse | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/public/landing`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = (await res.json()) as ApiResponse<LandingStaticsApiBody> | LandingStaticsApiBody;
    const body = isApiResponse(data) ? data.body : data;

    return {
      trustedPatients: body.trustedPatients,
      experience: body.experience ?? body.experienceYears ?? 0,
      specialistDoctors: body.specialistDoctors,
      satisfaction: body.satisfaction ?? body.satisfactionRate ?? 0,
    };
  } catch (error) {
    console.error("Error fetching landing statics:", error);
    return null;
  }
}
