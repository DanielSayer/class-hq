import {
  filterSuggestionItems,
  getDefaultSlashMenuItems,
} from "@blocknote/core";
import type { DefaultReactSuggestionItem } from "@blocknote/react";
import { SuggestionMenuController } from "@blocknote/react";
import type { ZyricEditor } from "./useEditor";

type CustomSlashMenuProps = {
  editor: ZyricEditor;
};

const getSlashMenuItems = (
  editor: ZyricEditor,
): DefaultReactSuggestionItem[] => {
  return getDefaultSlashMenuItems(editor).filter(
    (item) => item.group !== "Media",
  );
};

export function CustomSlashMenu({ editor }: CustomSlashMenuProps) {
  return (
    <SuggestionMenuController
      //@ts-expect-error Type is too complex to type
      editor={editor}
      triggerCharacter="/"
      getItems={async (query) =>
        filterSuggestionItems(getSlashMenuItems(editor), query)
      }
    />
  );
}
