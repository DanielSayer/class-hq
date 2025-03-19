import { get } from "@/server/data-access-layer/lesson-plans/get";
import { TRPCError } from "@trpc/server";

export async function getLessonPlan(lessonPlanId: bigint, userId: string) {
  const lessonPlan = await get(lessonPlanId, userId);

  if (!lessonPlan) {
    throw new TRPCError({
      message: "Failed to create get plan",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  return lessonPlan;
}
