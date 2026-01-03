export interface RetryLogPayload {
  attempt: number;
  maxRetries: number;
  status: number;
  delayMs: number;
  retryAfter: boolean;
}

export const logger = {
  warn(message: string, payload: RetryLogPayload) {
    console.warn(message, payload);
  },
};
