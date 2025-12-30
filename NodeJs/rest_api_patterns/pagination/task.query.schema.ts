import { z } from "zod";

export const taskQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "page must be a number")
    .transform(Number)
    .default("1"),

  limit: z
    .string()
    .regex(/^\d+$/, "limit must be a number")
    .transform(Number)
    .default("10"),
});
