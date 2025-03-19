import {
  update,
  type UpdateLessonPlanRequest,
} from "@/server/data-access-layer/lesson-plans/update";
import { TRPCError } from "@trpc/server";

export async function updateLessonPlan(req: UpdateLessonPlanRequest) {
  const updatedLessonPlanId = await update(req);

  if (!updatedLessonPlanId) {
    throw new TRPCError({
      message: `Failed to update lesson plan ${req.lessonPlanId}, user ${req.userId}`,
      code: "NOT_FOUND",
    });
  }

  return updatedLessonPlanId;
}
