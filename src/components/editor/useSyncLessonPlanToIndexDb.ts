import { useDebounce } from "@/hooks/use-debounce";
import indexDb, { type IDBLessonPlan } from "@/server/index-db/db";
import type { Block } from "@blocknote/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const TITLE_DEBOUNCE = 1000;
const BLOCK_SAVE_DEBOUNCE = 5000;

type HookProps = {
  lessonPlan: IDBLessonPlan;
};

export const useSyncLessonPlanToIndexDb = ({ lessonPlan }: HookProps) => {
  const [blocks, setBlocks] = useState<Block[]>(lessonPlan.content);
  const debouncedBlocks = useDebounce(blocks, BLOCK_SAVE_DEBOUNCE);

  const [title, setTitle] = useState(lessonPlan.title ?? "");
  const debouncedTitle = useDebounce(title, TITLE_DEBOUNCE);

  const [coverId, setCoverId] = useState(lessonPlan.backgroundId);

  useQuery({
    queryKey: [lessonPlan.id, debouncedTitle, coverId, debouncedBlocks],
    queryFn: async () => {
      await indexDb.lessonPlans.put({
        id: lessonPlan.id,
        title: debouncedTitle,
        backgroundId: coverId,
        content: debouncedBlocks,
        updatedAt: new Date().toISOString(),
      });

      return { updated: true };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    title,
    coverId,
    handleTitleChange: setTitle,
    handleCoverChange: setCoverId,
    handleBlockChange: setBlocks,
  };
};
