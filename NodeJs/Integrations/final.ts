const TIMEOUT = 5000;

export type HttpError = {
  type: "http_error";
  url: string;
  status: number;
  message: string;
  body?: unknown;
};

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
      let errorBody: unknown;

      try {
        errorBody = await res.json();
      } catch {
        errorBody = undefined;
      }

      const error: HttpError = {
        type: "http_error",
        url,
        status: res.status,
        message: `HTTP ${res.status}`,
        body: errorBody,
      };

      throw error;
    }
    try {
      return await res.json();
    } catch {
      throw {
        type: "invalid_json",
        url,
        status: res.status,
        message: "Invalid JSON response",
      };
    }
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw {
        type: "timeout",
        url,
        message: `Request timed out after ${TIMEOUT}ms`,
      };
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
