"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/misc/getGreeting";
import type { LessonPlan } from "@/lib/types/plan";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { LessonPlanCard } from "./lesson-plan-card";

type DashboardProps = {
  plans: Omit<LessonPlan, "content" | "updatedAt" | "userId">[];
};

export function Dashboard({ plans }: DashboardProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = api.plans.create.useMutation();

  const handleCreateLessonPlan = async () => {
    await mutateAsync(void 0, {
      onSuccess: ({ id }) => router.push(`/dashboard/${id}`),
    });
  };

  return (
    <div className="flex flex-col gap-16 p-8">
      <h2 className="flex items-center justify-between text-3xl font-semibold tracking-wide">
        {getGreeting()}
        <Button
          variant="rainbow"
          isLoading={isPending}
          loadingContent={"Creating..."}
          className="dark:text-neutral-700"
          onClick={handleCreateLessonPlan}
        >
          New Lesson Plan
        </Button>
      </h2>

      {plans.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-20 text-center">
          <Icons.Shocked className="h-32 w-32" />
          <span className="text-xl">No lesson plans yet!</span>
          <Button
            variant="rainbow"
            isLoading={isPending}
            loadingContent={"Creating..."}
            className="dark:text-neutral-700"
            onClick={handleCreateLessonPlan}
          >
            Create one!
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {plans.map((x) => (
          <LessonPlanCard
            id={x.id}
            key={x.id}
            name={x.name}
            background={x.background}
          />
        ))}
      </div>
    </div>
  );
}
