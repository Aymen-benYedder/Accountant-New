import { JumboLayoutProvider } from "@jumbo/components/JumboLayout";
import { Outlet } from "react-router-dom";

export function SoloLayout() {
  return (
    <JumboLayoutProvider>
      <Outlet />
    </JumboLayoutProvider>
  );
}
