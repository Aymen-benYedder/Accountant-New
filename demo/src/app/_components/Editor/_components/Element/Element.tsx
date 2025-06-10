import React from "react";
import { EditorElement } from "../../_types";
import { ElementControls } from "../ElementControls";
import { useEditor } from "../../_hooks";

interface ElementProps {
  el: EditorElement;
}
export function Element({ el }: ElementProps) {
  const [showControls, setShowControls] = React.useState(false);
  const { onNewElement } = useEditor();

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onNewElement(el);
    }
  };

  React.useEffect(() => {
    document.getElementById(`${el.id}`)?.focus();
  }, []);

  return (
    <div
      onMouseOver={() => setShowControls(true)}
      onMouseOut={() => setShowControls(false)}
    >
      <ElementControls show={showControls} />
      <div id={`${el.id}`} contentEditable onKeyDown={handleEnter}>
        {el.content}
      </div>
    </div>
  );
}
