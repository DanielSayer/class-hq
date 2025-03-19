import type { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";

type EditorProps = {
  initialContent?: Block[];
};

export const useEditor = ({ initialContent }: EditorProps) => {
  return useCreateBlockNote({
    initialContent: initialContent?.length === 0 ? undefined : initialContent,
  });
};

export type ZyricEditor = ReturnType<typeof useEditor>;
