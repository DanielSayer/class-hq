import { db } from "@/server/db";
import { PlansTable } from "@/server/db/schema";

export async function create(userId: string) {
  const [lessonPlan] = await db
    .insert(PlansTable)
    .values({
      userId: userId,
    })
    .returning({
      id: PlansTable.id,
    });

  return lessonPlan;
}
