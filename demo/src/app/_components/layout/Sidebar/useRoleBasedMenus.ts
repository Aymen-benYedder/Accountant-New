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
  
  // Debug logging
  console.log("useRoleBasedMenus: user data", user);

  // List of menu items that should be visible to all users
  const listViewItems: MenuItem[] = [
    {
      path: "/list-views/projects",
      // label: t("sidebar.menuItem.projects"),
      label:"Archive",
      icon: "projects-list",
    },
  ];

  // Add users menu item only for admin and accountant roles
  if (user && (user.role === 'admin' || user.role === 'accountant')) {
    console.log("useRoleBasedMenus: Adding users menu for role", user.role);
    listViewItems.push({
      path: "/list-views/users",
      label: t("sidebar.menuItem.users"),
      icon: "users-list",
    });
  }
  
  // Add tasks menu item only for accountant roles
  if (user && user.role === 'accountant') {
    console.log("useRoleBasedMenus: Adding tasks menu for accountant");
    listViewItems.push({
      path: "/apps/tasks",
      label: "Tasks",
      icon: "tasks",
    });
  }
  
  // Add client tasks menu item only for owner roles
  if (user && user.role === 'owner') {
    console.log("useRoleBasedMenus: Adding client tasks menu for owner");
    listViewItems.push({
      path: "/apps/tasks/client",
      label: "My Tasks",
      icon: "tasks",
    });
  }

  return [
    {
      label: t("sidebar.menu.listView"),
      children: listViewItems,
    },
  ];
}
