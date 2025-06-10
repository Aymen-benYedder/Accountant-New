import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const editorContent =
  "<h2>Awesome Rich Content</h2>\n" +
  "<p>Suspendisse id sollicitudin dui. <strong>Vestibulum eu sapien pharetra,</strong> bibendum ligula id, ullamcorper ligula.</p>\n" +
  "\n" +
  "<ul>\n" +
  "        <li>ullamcorper ligula</li>\n" +
  "        <li>Duis vel neque</li>\n" +
  "</ul>\n" +
  "\n" +
  "<p><em>Sed feugiat hendrerit risus, quis efficitur massa facilisis vitae. Aliquam erat volutpat. </em></p>\n";
const CkEditorWrapper = () => {
  const editor: any = ClassicEditor;
  return <CKEditor editor={editor} data={editorContent} />;
};
export { CkEditorWrapper };
