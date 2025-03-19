"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import "@/styles/editor.css";

import type { IDBLessonPlan } from "@/server/index-db/db";
import { BlockNoteView } from "@blocknote/shadcn";
import { Textarea } from "../ui/textarea";
import { AddCoverButton } from "./add-cover-button";
import { Cover } from "./cover";
import { CustomSlashMenu } from "./custom-slash-menu";
import { useEditor } from "./useEditor";
import { useSyncLessonPlanToDb } from "./useSyncLessonPlanToDb";
import { useSyncLessonPlanToIndexDb } from "./useSyncLessonPlanToIndexDb";
import { useSyncOnUnmount } from "./useSyncOnUnmount";
import { useSyncUpToIndexDb } from "./useSyncUpToIndexDb";

type EditorProps = {
  lessonPlan: IDBLessonPlan;
};

export default function Editor({ lessonPlan }: EditorProps) {
  useSyncUpToIndexDb({ lessonPlan });
  useSyncLessonPlanToDb(lessonPlan.id);
  const editor = useEditor({ initialContent: lessonPlan.content });

  const {
    title,
    coverId,
    handleCoverChange,
    handleTitleChange,
    handleBlockChange,
  } = useSyncLessonPlanToIndexDb({ lessonPlan });

  const onChange = () => {
    handleBlockChange(editor.document);
  };

  useSyncOnUnmount({
    lessonPlan: {
      id: lessonPlan.id,
      title,
      backgroundId: coverId,
      content: editor.document,
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-12">
      <Cover background={coverId} />
      <div className="container mx-auto mt-4 space-y-4 px-4">
        <div className="group flex flex-col gap-2">
          <div className="duration-400 flex opacity-0 transition-opacity group-hover:opacity-100">
            <AddCoverButton handleCoverChange={handleCoverChange} />
          </div>
          <Textarea
            className="line-clamp-1 min-h-0 resize-none appearance-none overflow-hidden truncate border-none p-0 !text-4xl font-bold shadow-none outline-none focus:outline-none focus-visible:ring-0"
            rows={1}
            placeholder="Untitled Page"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
        <div className="-mx-[54px]">
          <BlockNoteView
            editor={editor}
            slashMenu={false}
            theme="dark"
            onChange={onChange}
          >
            <CustomSlashMenu editor={editor} />
          </BlockNoteView>
        </div>
      </div>
    </div>
  );
}
