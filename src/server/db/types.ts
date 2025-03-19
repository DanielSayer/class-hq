import type { BackgroundId } from "@/lib/backgrounds";
import type { Block } from "@blocknote/core";

export type DBLessonPlan = {
  id: bigint;
  name: string | null;
  content: Block[];
  background: BackgroundId | null;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
};
