import type { BackgroundId } from "@/lib/backgrounds";
import { db } from "@/server/db";
import { PlansTable } from "@/server/db/schema";
import type { Block } from "@blocknote/core";
import { and, eq } from "drizzle-orm";

export type UpdateLessonPlanRequest = {
  lessonPlanId: bigint;
  title: string;
  background: BackgroundId | null;
  content: Block[];
  userId: string;
};

export async function update(req: UpdateLessonPlanRequest) {
  const [updatedLessonPlanId] = await db
    .update(PlansTable)
    .set({
      name: req.title,
      background: req.background,
      content: req.content,
    })
    .where(
      and(
        eq(PlansTable.id, req.lessonPlanId),
        eq(PlansTable.userId, req.userId),
      ),
    )
    .returning({ id: PlansTable.id });

  return updatedLessonPlanId;
}
