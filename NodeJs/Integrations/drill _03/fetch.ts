export async function fetchJson<T>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}
