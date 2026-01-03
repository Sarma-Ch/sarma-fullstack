const TIMEOUT = 5000;

export async function fetchJson(
  url: string,
  options: RequestInit = {}
): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    console.log(`[fetchJson] ${url} → ${res.status}`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    try {
      return await res.json();
    } catch {
      throw new Error("Invalid JSON response");
    }
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.log(`[fetchJson] ${url} → TIMEOUT`);
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
