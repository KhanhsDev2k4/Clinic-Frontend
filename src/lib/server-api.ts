import "server-only";

export function getInternalApiBaseUrl(): string {
  const url = process.env.API_INTERNAL_URL;

  if (!url) {
    throw new Error("Missing environment variable: API_INTERNAL_URL");
  }

  return url.replace(/\/+$/, "");
}