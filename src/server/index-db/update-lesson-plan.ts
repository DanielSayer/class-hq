import indexDb, { type IDBLessonPlan } from "./db";

type UpdateLessonPlanRequest = Omit<IDBLessonPlan, "updatedAt">;

export function updateIDBLessonPlan(req: UpdateLessonPlanRequest) {
  indexDb
    .table("lessonPlans")
    .put({
      id: req.id,
      title: req.title,
      background: req.backgroundId,
      content: req.content,
      updatedAt: new Date().toISOString(),
    })
    .catch(console.error);
}
