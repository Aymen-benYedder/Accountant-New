import React from "react";
import { EditorContext } from "./EditorContext";
import { Elements } from "./_components/Elements/Elements";
import { EditorElement } from "./_types";
import { getNewID } from "@app/_utilities/helpers";

interface EditorProps {
  data: EditorElement[];
}

export function Editor({ data }: EditorProps) {
  const [editorData, setEditorData] = React.useState(data);

  const onNewElement = (el?: EditorElement) => {
    let newData: EditorElement[] = [...editorData];

    const newElement = {
      id: getNewID(),
      tag: "p",
      content: "its a new element",
    };

    if (el) {
      //TODO: add new element right after el
      const currentIndex = newData.findIndex((element) => element.id === el.id);
      if (currentIndex !== -1) {
        if (currentIndex === newData.length - 1) {
          newData.push(newElement);
        } else {
          newData.splice(currentIndex + 1, 0, newElement);
        }
      }
    } else {
      newData.push(newElement);
    }
    setEditorData(newData);
  };

  const editorValues = React.useMemo(
    () => ({
      data: editorData,
      onNewElement,
    }),
    [editorData]
  );

  return (
    <EditorContext.Provider value={editorValues}>
      <Elements />
    </EditorContext.Provider>
  );
}
