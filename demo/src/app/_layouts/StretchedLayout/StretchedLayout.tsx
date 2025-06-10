import { Footer, Header, Sidebar } from "@app/_components/layout";
import { getMenus } from "@app/_components/layout/Sidebar/menus-items";
import { defaultLayoutConfig } from "@app/_config/layouts";
import { CustomizerButton } from "@app/_shared/CustomizerButton";
import { CustomizerSettings } from "@app/_shared/CustomizerSettings";
import {
  JumboLayout,
  JumboLayoutProvider,
} from "@jumbo/components/JumboLayout";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function StretchedLayout() {
  const location = useLocation();
  const menus = getMenus();
  // DEBUG
  // eslint-disable-next-line no-console
  console.log("StretchedLayout: rendering at", location.pathname);
  // DEBUG: children and Outlet check
  // eslint-disable-next-line no-console
  console.log("StretchedLayout: children and render Slot/Outlet", { pathname: location.pathname });
  return (
    <JumboLayoutProvider
      layoutConfig={defaultLayoutConfig}
      debugOptions={{ name: "StrechedLayout" }}
    >
      <JumboLayout
        header={<Header />}
        footer={<Footer />}
        sidebar={<Sidebar menus={menus} />}
      >
        {location.pathname === "/" && <Navigate to={"/dashboards/misc"} />}
        <Outlet />
        <CustomizerSettings />
        <CustomizerButton />
      </JumboLayout>
    </JumboLayoutProvider>
  );
}
