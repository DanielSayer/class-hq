import { db } from "@/server/db";
import { PlansTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getLessonPlans(userId: string) {
  return db.query.PlansTable.findMany({
    columns: { id: true, name: true, background: true, createdAt: true },
    where: eq(PlansTable.userId, userId),
  });
}
