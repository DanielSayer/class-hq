import { redirect } from "next/navigation";

export function parseLessonPlanId(id: string) {
  const parsedId = BigInt(id);

  if (parsedId === undefined) {
    redirect("/not-found");
  }

  return parsedId;
}
