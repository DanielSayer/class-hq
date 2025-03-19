import indexDb, { type IDBLessonPlan } from "@/server/index-db/db";
import { api } from "@/trpc/react";
import { diff } from "jsondiffpatch";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const DB_SYNC_TIMER = 1000 * 60;

export const useSyncLessonPlanToDb = (id: string) => {
  const previousLession = useRef<IDBLessonPlan | null>(null);

  const { mutateAsync } = api.plans.update.useMutation({
    onSuccess: () => {
      if (previousLession.current) {
        toast.success("Successfully saved.", { duration: 1500 });
      }
    },
    onError: () => {
      toast.error("Failed to save.");
    },
  });

  useEffect(() => {
    const syncLessonPlan = async () => {
      const lessonPlan = await indexDb.lessonPlans.get(id);
      if (!lessonPlan) return;

      const delta = diff(lessonPlan, previousLession.current);

      if (delta) {
        await mutateAsync({
          id: lessonPlan.id,
          title: lessonPlan.title,
          coverId: lessonPlan.backgroundId,
          content: lessonPlan.content,
        });

        previousLession.current = lessonPlan;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(syncLessonPlan, DB_SYNC_TIMER);
    return () => clearInterval(interval);
  }, [id, mutateAsync]);
};
