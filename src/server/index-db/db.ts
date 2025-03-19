import Dexie, { type EntityTable } from "dexie";
import type { Block } from "@blocknote/core";
import type { BackgroundId } from "@/lib/backgrounds";

export type IDBLessonPlan = {
  id: string;
  title: string;
  backgroundId: BackgroundId | null;
  content: Block[];
  updatedAt: string;
};

const indexDb = new Dexie("class_hq") as Dexie & {
  lessonPlans: EntityTable<IDBLessonPlan, "id">;
};

indexDb.version(1).stores({
  lessonPlans: "id,backgroundId,title,content,updatedAt",
});

export default indexDb;
