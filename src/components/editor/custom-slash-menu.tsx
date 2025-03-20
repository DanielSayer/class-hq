import {
  filterSuggestionItems,
  getDefaultSlashMenuItems,
} from "@blocknote/core";
import type { DefaultReactSuggestionItem } from "@blocknote/react";
import { SuggestionMenuController } from "@blocknote/react";
import type { ClassHQEditor } from "./useEditor";

type CustomSlashMenuProps = {
  editor: ClassHQEditor;
};

const getSlashMenuItems = (
  editor: ClassHQEditor,
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
