import { Footer, Header, Sidebar } from "@app/_components/layout";
import { JumboTheme } from "@jumbo/components";
import {
  JumboLayout,
  JumboLayoutProvider,
} from "@jumbo/components/JumboLayout";
import { Outlet } from "react-router-dom";
import { layout1Menus } from "./_components/Sidebar/menus";
import { layout1Config } from "./_config";
import { initTheme } from "./_theme";

export function NewLayout1() {
  return (
    <JumboTheme init={initTheme}>
      <JumboLayoutProvider layoutConfig={layout1Config}>
        <JumboLayout
          header={<Header />}
          footer={<Footer />}
          sidebar={<Sidebar menus={layout1Menus} />}
        >
          <Outlet />
        </JumboLayout>
      </JumboLayoutProvider>
    </JumboTheme>
  );
}
