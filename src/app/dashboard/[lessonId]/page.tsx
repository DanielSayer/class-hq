import { api } from "@/trpc/server";
import LessonPlanPage from "./client-page";
import { unstable_noStore } from "next/cache";

type Params = {
  params: Promise<{ lessonId: string }>;
};

export default async function Page({ params }: Params) {
  unstable_noStore();
  const { lessonId } = await params;
  const dbLessonPlan = await api.plans.get({ planId: lessonId });

  return <LessonPlanPage dbLessonPlan={dbLessonPlan} />;
}
