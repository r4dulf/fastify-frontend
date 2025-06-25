const API_BASE = "http://localhost:3000";

export const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const url =
    typeof input === "string" && input.startsWith("/")
      ? `${API_BASE}${input}`
      : input;

  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message || "Unexpected error");
  }

  return res.json();
};
