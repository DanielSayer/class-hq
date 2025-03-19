import type { IDBLessonPlan } from "@/server/index-db/db";
import { updateIDBLessonPlan } from "@/server/index-db/update-lesson-plan";
import { api } from "@/trpc/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type LessonPlan = Omit<IDBLessonPlan, "updatedAt">;
type UseSyncOnUnmountProps = {
  lessonPlan: LessonPlan;
};

export const useSyncOnUnmount = ({ lessonPlan }: UseSyncOnUnmountProps) => {
  const lessonPlanRef = useRef<LessonPlan>(lessonPlan);
  const { mutate } = api.plans.update.useMutation();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    lessonPlanRef.current = lessonPlan;
  }, [lessonPlan]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Want to listen to route changes
  useEffect(() => {
    return () => {
      mutate({
        id: lessonPlanRef.current.id,
        title: lessonPlanRef.current.title,
        coverId: lessonPlanRef.current.backgroundId,
        content: lessonPlanRef.current.content,
      });
      updateIDBLessonPlan(lessonPlanRef.current);
    };
  }, [pathname, params, mutate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      updateIDBLessonPlan(lessonPlanRef.current);

      // This ensures the above runs
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setTimeout(() => {}, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updateIDBLessonPlan(lessonPlanRef.current);

        // This ensures the above runs
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setTimeout(() => {}, 0);
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
