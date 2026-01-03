import { env } from "./env";
import { fetchJson } from "./fetch";

export function apiKeyClient<T>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  return fetchJson<T>(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${env.API_KEY}`,
    },
  });
}
