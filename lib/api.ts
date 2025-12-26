export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

function getBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return "http://localhost:8080/api/v1";
  return base.replace(/\/$/, "");
}

export async function bhFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${getBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });

  if (!res.ok) {
    let payload: any = null;
    try { payload = await res.json(); } catch {}
    const err: ApiError = {
      status: res.status,
      message: payload?.message || res.statusText || "Request failed",
      details: payload?.details
    };
    throw err;
  }

  // Handle 204
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
