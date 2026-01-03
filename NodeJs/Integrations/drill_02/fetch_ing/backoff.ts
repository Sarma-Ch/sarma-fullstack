export function exponentialBackoffWithJitter(
  attempt: number,
  baseDelayMs: number,
  maxDelayMs: number
): number {
  const exponential = baseDelayMs * 2 ** attempt;
  const jitter = Math.random() * exponential * 0.3; // 30% jitter
  return Math.min(exponential + jitter, maxDelayMs);
}
