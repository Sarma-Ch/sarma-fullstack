import { sleep } from "./sleep";
import { exponentialBackoffWithJitter } from "./backoff.ts";
import { getRetryAfterDelayMs } from "./retryAfter";
import { logger } from "./log.ts";

const Retryable = new Set([429, 502, 503, 504]);

export async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
  retries = 3,
  delayMs = 500,
  maxDelayMs = 10_000
): Promise<T> {
  let attempt = 0;

  while (true) {
    const response = await fetch(input, init);

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    const status = response.status;

    if (status >= 400 && status < 500 && status !== 429) {
      const body = await response.text().catch(() => "");
      throw new Error(`Client Error${status}: ${body}`);
    }

    const Retry = Retryable.has(status) && attempt < retries;

    if (!Retry) {
      const body = await response.text().catch(() => "");
      throw new Error(`Request failed with status ${response.status}: ${body}`);
    }
    let retryAfterDelay = getRetryAfterDelayMs(response);

    const computedDelayMs =
      retryAfterDelay ??
      exponentialBackoffWithJitter(attempt, delayMs, maxDelayMs);

    logger.warn("Retrying request", {
      attempt: attempt + 1,
      maxRetries: retries,
      status: response.status,
      delayMs,
      retryAfter: retryAfterDelay != null,
    });

    await sleep(computedDelayMs);
    attempt++;
  }
}
