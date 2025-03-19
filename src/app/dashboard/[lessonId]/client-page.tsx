"use client";

import { Editor } from "@/components/editor";
import type { DBLessonPlan } from "@/server/db/types";
import { api } from "@/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import LoadingPage from "./loading";
import indexDb, { type IDBLessonPlan } from "@/server/index-db/db";
import { toIdbLessonPlan } from "@/server/index-db/extensions";

type LessonPlanPageProps = {
  dbLessonPlan: DBLessonPlan;
};

export default function LessonPlanPage({ dbLessonPlan }: LessonPlanPageProps) {
  const { lessonId } = useParams<{ lessonId: string }>();
  const {
    data: idbLessonPlan,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["idb-lesson-plan", lessonId],
    queryFn: async () => {
      const idbLessonPlan = await indexDb.lessonPlans.get(lessonId);

      if (!idbLessonPlan) {
        return Promise.reject(new Error("No lesson plan cached"));
      }

      return idbLessonPlan;
    },
    staleTime: 0,
  });

  const { mutate } = api.plans.update.useMutation();

  const data: IDBLessonPlan | undefined = useMemo(() => {
    if (isFetching) return;
    if (!idbLessonPlan || status === "error") {
      return toIdbLessonPlan(dbLessonPlan);
    }

    const dbLastSyncTime = dbLessonPlan.updatedAt ?? dbLessonPlan.createdAt;
    const dbSyncTime = dbLastSyncTime.getTime();
    const idbSyncTime = new Date(idbLessonPlan.updatedAt).getTime();

    const isIdbFresher = idbSyncTime > dbSyncTime;

    if (isIdbFresher) {
      mutate({
        id: idbLessonPlan.id,
        title: idbLessonPlan.title,
        coverId: idbLessonPlan.backgroundId ?? null,
        content: idbLessonPlan.content,
      });
    }

    return isIdbFresher ? idbLessonPlan : toIdbLessonPlan(dbLessonPlan);
  }, [idbLessonPlan, dbLessonPlan, status, isFetching, mutate]);

  if (isFetching || !data) {
    return <LoadingPage />;
  }

  return <Editor lessonPlan={data} />;
}
