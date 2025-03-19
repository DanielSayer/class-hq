import { create } from "@/server/data-access-layer/lesson-plans/create";
import { TRPCError } from "@trpc/server";

export async function createLessonPlan(userId: string) {
  const lessonPlan = await create(userId);

  if (!lessonPlan) {
    throw new TRPCError({
      message: "Failed to create lesson plan",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  return lessonPlan;
}
