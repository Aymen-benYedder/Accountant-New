import { useTranslation } from "react-i18next";
import { useAuth } from "@app/_components/_core/AuthProvider/AuthContext";

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  children?: MenuItem[];
}

export function useRoleBasedMenus() {
  const { t } = useTranslation();
  const { user } = useAuth();

  // List of menu items that should be visible to all users
  const listViewItems: MenuItem[] = [
    {
      path: "/list-views/projects",
      label: t("sidebar.menuItem.projects"),
      icon: "projects-list",
    },
  ];

  // Add users menu item only for admin and accountant roles
  if (user && (user.role === 'admin' || user.role === 'accountant')) {
    listViewItems.push({
      path: "/list-views/users",
      label: t("sidebar.menuItem.users"),
      icon: "users-list",
    });
  }

  return [
    {
      label: t("sidebar.menu.listView"),
      children: listViewItems,
    },
  ];
}
