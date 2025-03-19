import { api } from "@/trpc/server";
import { Dashboard } from "./dashboard";

export default async function Page() {
  const lessonPlans = await api.plans.getAll();

  return <Dashboard plans={lessonPlans} />;
}
