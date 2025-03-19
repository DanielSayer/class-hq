import type { Block } from "@blocknote/core";
import type { BackgroundId } from "../backgrounds";

export type LessonPlan = {
  id: string;
  name: string | null;
  content: Block[];
  background: BackgroundId | null;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
};
