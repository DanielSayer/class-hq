import indexDb, { type IDBLessonPlan } from "@/server/index-db/db";
import { useEffect } from "react";

type UseSyncUpToIndexDbProps = {
  lessonPlan: IDBLessonPlan;
};

export const useSyncUpToIndexDb = ({ lessonPlan }: UseSyncUpToIndexDbProps) => {
  useEffect(() => {
    const setIndexDb = async () => {
      await indexDb.lessonPlans.put({
        id: lessonPlan.id,
        title: lessonPlan.title ?? "",
        backgroundId: lessonPlan.backgroundId,
        content: lessonPlan.content,
        updatedAt: new Date().toISOString(),
      });
    };

    void setIndexDb();
  }, [
    lessonPlan.backgroundId,
    lessonPlan.content,
    lessonPlan.id,
    lessonPlan.title,
  ]);
};
