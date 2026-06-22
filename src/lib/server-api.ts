export function getInternalApiBaseUrl(): string {
  const url =
    typeof window === "undefined"
      ? process.env.API_INTERNAL_URL
      : process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error(
      typeof window === "undefined"
        ? "API_INTERNAL_URL is not configured"
        : "NEXT_PUBLIC_API_URL is not configured"
    );
  }

  return url.replace(/\/+$/, "");
}