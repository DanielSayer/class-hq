import { backgrounds } from "@/lib/backgrounds";
import { z } from "zod";

export const getPlanSchema = z.object({
  planId: z.string(),
});

export const updatePlanSchema = z.object({
  id: z.string(),
  title: z.string(),
  coverId: z.enum(backgrounds).optional().nullable(),
  content: z.array(z.any()).nullable(),
});
