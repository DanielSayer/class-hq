import type { Optional } from "@/lib/types/optional";
import { db } from "@/server/db";
import { PlansTable } from "@/server/db/schema";
import type { DBLessonPlan } from "@/server/db/types";
import { and, eq } from "drizzle-orm";

export async function get(lessonPlanId: bigint, userId: string) {
  const lessonPlan = await db.query.PlansTable.findFirst({
    where: and(eq(PlansTable.id, lessonPlanId), eq(PlansTable.userId, userId)),
  });

  return lessonPlan as Optional<DBLessonPlan>;
}
