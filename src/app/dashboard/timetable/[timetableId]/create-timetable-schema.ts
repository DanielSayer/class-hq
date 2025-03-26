import { durations } from "@/lib/timetables/durations";
import { z } from "zod";

export const createTimetableSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  duration: z.string().refine((v) => durations.includes(Number(v)), {
    message: "Duration is invalid",
  }),
  startDate: z.date(),
  endDate: z.date(),
});

export type CreateTimetable = z.infer<typeof createTimetableSchema>;
