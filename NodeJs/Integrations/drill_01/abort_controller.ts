const TimeOut = 5000;

export async function fetchJson(url: string, options = {}) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, TimeOut);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return await res.json();
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Request timed out after ${TimeOut}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
