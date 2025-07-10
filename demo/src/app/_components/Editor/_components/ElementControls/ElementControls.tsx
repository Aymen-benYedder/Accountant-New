interface EditorControlsProps {
  show: boolean;
}
export function ElementControls({ show }: EditorControlsProps) {
  if (!show) return null;

  return <div>control functions</div>;
}
