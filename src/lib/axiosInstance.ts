// lib/axiosInstance.ts
import { AUTH_SESSION_SWR_KEY } from "@/hooks";
import { AUTH_INITIAL_STATE } from "@/hooks/useSession";
import axios from "axios";
import { mutate } from "swr";

/**
 * Chuẩn hóa body trước khi gửi:
 * - Trim string (bỏ khoảng trắng đầu/cuối)
 * - Loại bỏ field có giá trị null | undefined
 * - Xử lý đệ quy với nested object & array
 * - Bỏ qua FormData (để nguyên)
 */
const sanitizeBody = (
  body: Record<string, unknown> | FormData | undefined
): Record<string, unknown> | FormData | undefined => {
  if (!body || body instanceof FormData) return body;

  const sanitizeValue = (value: unknown): unknown => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === "string") return value.trim();
    if (Array.isArray(value)) {
      return value.map(sanitizeValue).filter((v) => v !== null && v !== undefined);
    }
    if (typeof value === "object") {
      return sanitizeBody(value as Record<string, unknown>);
    }
    return value;
  };

  return Object.fromEntries(
    Object.entries(body)
      .map(([key, value]) => [key, sanitizeValue(value)])
      .filter(([, value]) => value !== null && value !== undefined)
  );
};

// ─── Axios Instance ───────────────────────────────────────────────────────────

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

axiosInstance.interceptors.request.use((config) => {
  if (config.data && !(config.data instanceof FormData)) {
    config.data = sanitizeBody(config.data as Record<string, unknown>);
  }
  return config;
});

// ─── Response Interceptor ────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
        refreshToken,
      });

      localStorage.setItem("refreshToken", data.refreshToken);
      mutate(
        AUTH_SESSION_SWR_KEY,
        { accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user },
        { revalidate: false }
      );

      processQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem("refreshToken");
      mutate(AUTH_SESSION_SWR_KEY, AUTH_INITIAL_STATE, { revalidate: false });
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
