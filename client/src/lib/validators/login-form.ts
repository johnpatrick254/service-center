import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1).max(20),
});

export type LoginType = z.infer<typeof loginSchema>;
