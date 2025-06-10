import { useEditor } from "../../_hooks";
import { Element } from "../Element";

export function Elements() {
  const { data } = useEditor();
  return (
    <div>
      {data.map((element) => (
        <Element el={element} key={element.id} />
      ))}
    </div>
  );
}
