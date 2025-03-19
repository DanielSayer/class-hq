import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createLessonPlan } from "@/server/application/lesson-plans/create-lesson-plan";
import { getAllLessonPlans } from "@/server/application/lesson-plans/get-all-lesson-plans";
import { getLessonPlan } from "@/server/application/lesson-plans/get-lesson-plan";
import { updateLessonPlan } from "@/server/application/lesson-plans/update-lesson-plan";
import { parseLessonPlanId } from "@/server/utils/lesson-plan-id-parser";
import { getPlanSchema, updatePlanSchema } from "./schemas";
import type { Block } from "@blocknote/core";

export const plansRouter = createTRPCRouter({
  get: protectedProcedure.input(getPlanSchema).query(async ({ ctx, input }) => {
    const lessonPlanId = parseLessonPlanId(input.planId);
    return await getLessonPlan(lessonPlanId, ctx.userId);
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await getAllLessonPlans(ctx.userId);
  }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    return await createLessonPlan(ctx.userId);
  }),

  update: protectedProcedure
    .input(updatePlanSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const lessonPlanId = parseLessonPlanId(id);

      return await updateLessonPlan({
        lessonPlanId,
        title: rest.title,
        background: rest.coverId ?? null,
        content: (rest.content ?? []) as Block[],
        userId: ctx.userId,
      });
    }),
});
