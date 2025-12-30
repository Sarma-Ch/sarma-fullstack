import { z } from "zod";

export const taskQuerySchema = z.object({
  limit: z
    .string()
    .regex(/^\d+$/, "limit must be a number")
    .optional(),

  offset: z
    .string()
    .regex(/^\d+$/, "offset must be a number")
    .optional(),
});
