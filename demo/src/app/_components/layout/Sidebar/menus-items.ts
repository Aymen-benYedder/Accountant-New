import { useTranslation } from "react-i18next";

// This file is kept for backward compatibility
// New role-based menu logic is in useRoleBasedMenus.ts

export function getMenus() {
  const { t } = useTranslation();
  return [
    // {
    //   label: t("sidebar.menu.home"),
    //   children: [
    //     {
    //       path: "/dashboards/misc",
    //       label: t("sidebar.menuItem.misc"),
    //       icon: "misc",
    //     },
    //     {
    //       path: "/dashboards/crypto",
    //       label: t("sidebar.menuItem.crypto"),
    //       icon: "crypto",
    //     },
    //     {
    //       path: "/dashboards/listing",
    //       label: t("sidebar.menuItem.listing"),
    //       icon: "listing",
    //     },
    //     {
    //       path: "/dashboards/crm",
    //       label: t("sidebar.menuItem.crm"),
    //       icon: "crm",
    //     },
    //     {
    //       path: "/dashboards/intranet",
    //       label: t("sidebar.menuItem.intranet"),
    //       icon: "intranet",
    //     },
    //     {
    //       path: "/dashboards/ecommerce",
    //       label: t("sidebar.menuItem.ecommerce"),
    //       icon: "ecommerce",
    //     },
    //     {
    //       path: "/dashboards/news",
    //       label: t("sidebar.menuItem.news"),
    //       icon: "news",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.card"),
    //   children: [
    //     {
    //       path: "/widgets",
    //       label: t("sidebar.menuItem.widgets"),
    //       icon: "widget",
    //     },
    //     {
    //       path: "/metrics",
    //       label: t("sidebar.menuItem.metrics"),
    //       icon: "metric",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.user"),
    //   children: [
    //     {
    //       path: "/user/social-wall",
    //       label: t("sidebar.menuItem.socialWall"),
    //       icon: "social-wall",
    //     },
    //     {
    //       path: "/user/settings/public-profile",
    //       label: t("sidebar.menuItem.settings"),
    //       icon: "settings-outlined",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.userProfiles"),
    //   children: [
    //     {
    //       path: "/user/profile-1",
    //       label: t("sidebar.menuItem.profile1"),
    //       icon: "profile",
    //     },
    //     {
    //       path: "/user/profile-2",
    //       label: t("sidebar.menuItem.profile2"),
    //       icon: "profile-2",
    //     },
    //     {
    //       path: "/user/profile-3",
    //       label: t("sidebar.menuItem.profile3"),
    //       icon: "profile-3",
    //     },
    //     {
    //       path: "/user/profile-4",
    //       label: t("sidebar.menuItem.profile4"),
    //       icon: "profile-4",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.onboarding"),
    //   children: [
    //     {
    //       path: "/onboarding-1",
    //       label: t("sidebar.menuItem.onboarding1"),
    //       icon: "onboarding-1",
    //     },
    //     {
    //       path: "/onboarding-2",
    //       label: t("sidebar.menuItem.onboarding2"),
    //       icon: "onboarding-2",
    //     },
    //     {
    //       path: "/onboarding-3",
    //       label: t("sidebar.menuItem.onboarding3"),
    //       icon: "onboarding-3",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.apps"),
    //   children: [
    //     {
    //       path: "/apps/chat",
    //       label: t("sidebar.menuItem.chat"),
    //       icon: "chat",
    //     },
    //     {
    //       path: "/apps/contact",
    //       label: t("sidebar.menuItem.contact"),
    //       icon: "contact",
    //     },
    //     {
    //       path: "/apps/mail/inbox",
    //       label: t("sidebar.menuItem.mail"),
    //       icon: "mail",
    //     },
    //     {
    //       path: "/apps/invoice",
    //       label: t("sidebar.menuItem.invoice"),
    //       icon: "invoices",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.extensions"),
    //   children: [
    //     {
    //       label: t("sidebar.menu.editor"),
    //       collapsible: true,
    //       icon: "editor",
    //       children: [
    //         {
    //           path: "/extensions/editors/ck",
    //           label: t("sidebar.menuItem.ckEditor"),
    //         },
    //         {
    //           path: "/extensions/editors/wysiwyg",
    //           label: t("sidebar.menuItem.wysiwygEditor"),
    //         },
    //       ],
    //     },
    //     {
    //       path: "/extensions/dnd",
    //       label: t("sidebar.menuItem.dnd"),
    //       icon: "dnd",
    //     },
    //     {
    //       path: "/extensions/dropzone",
    //       label: t("sidebar.menuItem.dropzone"),
    //       icon: "dropzone",
    //     },
    //     {
    //       path: "/extensions/sweet-alert",
    //       label: t("sidebar.menuItem.sweetAlerts"),
    //       icon: "sweet-alert",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.modules"),
    //   children: [
    //     {
    //       label: t("sidebar.menu.calendar"),
    //       collapsible: true,
    //       icon: "calendar",
    //       children: [
    //         {
    //           path: "/modules/calendars/basic",
    //           label: t("sidebar.menuItem.basic"),
    //         },
    //         {
    //           path: "/modules/calendars/culture",
    //           label: t("sidebar.menuItem.cultures"),
    //         },
    //         {
    //           path: "/modules/calendars/popup",
    //           label: t("sidebar.menuItem.popup"),
    //         },
    //         {
    //           path: "/modules/calendars/rendering",
    //           label: t("sidebar.menuItem.rendering"),
    //         },
    //         {
    //           path: "/modules/calendars/selectable",
    //           label: t("sidebar.menuItem.selectable"),
    //         },
    //         {
    //           path: "/modules/calendars/timeslot",
    //           label: t("sidebar.menuItem.timeSlots"),
    //         },
    //       ],
    //     },
    //     {
    //       label: t("sidebar.menu.charts"),
    //       collapsible: true,
    //       icon: "chart",
    //       children: [
    //         {
    //           path: "/modules/charts/line",
    //           label: t("sidebar.menuItem.line"),
    //         },
    //         {
    //           path: "/modules/charts/bar",
    //           label: t("sidebar.menuItem.bar"),
    //         },
    //         {
    //           path: "/modules/charts/area",
    //           label: t("sidebar.menuItem.area"),
    //         },
    //         {
    //           path: "/modules/charts/composed",
    //           label: t("sidebar.menuItem.composed"),
    //         },
    //         {
    //           path: "/modules/charts/pie",
    //           label: t("sidebar.menuItem.pie"),
    //         },
    //         {
    //           path: "/modules/charts/scatter",
    //           label: t("sidebar.menuItem.scatter"),
    //         },
    //         {
    //           path: "/modules/charts/radial",
    //           label: t("sidebar.menuItem.radial"),
    //         },
    //         {
    //           path: "/modules/charts/radar",
    //           label: t("sidebar.menuItem.radar"),
    //         },
    //         {
    //           path: "/modules/charts/treemap",
    //           label: t("sidebar.menuItem.treeMap"),
    //         },
    //       ],
    //     },
    //     {
    //       label: t("sidebar.menu.maps"),
    //       collapsible: true,
    //       icon: "map",
    //       children: [
    //         {
    //           path: "/modules/maps/simple",
    //           label: t("sidebar.menuItem.simpleMap"),
    //         },
    //         {
    //           path: "/modules/maps/styled",
    //           label: t("sidebar.menuItem.styledMap"),
    //         },
    //         {
    //           path: "/modules/maps/geo-location",
    //           label: t("sidebar.menuItem.geoLocation"),
    //         },
    //         {
    //           path: "/modules/maps/directions",
    //           label: t("sidebar.menuItem.directional"),
    //         },
    //         {
    //           path: "/modules/maps/overlay",
    //           label: t("sidebar.menuItem.overlay"),
    //         },
    //         {
    //           path: "/modules/maps/kml",
    //           label: t("sidebar.menuItem.kmLayer"),
    //         },
    //         {
    //           path: "/modules/maps/popup-info",
    //           label: t("sidebar.menuItem.popupInfo"),
    //         },
    //         {
    //           path: "/modules/maps/street-view",
    //           label: t("sidebar.menuItem.streetView"),
    //         },
    //         {
    //           path: "/modules/maps/drawing",
    //           label: t("sidebar.menuItem.drawing"),
    //         },
    //         {
    //           path: "/modules/maps/clustering",
    //           label: t("sidebar.menuItem.clustering"),
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.authPages"),
    //   children: [
    //     {
    //       label: t("sidebar.menu.login"),
    //       collapsible: true,
    //       icon: "login",
    //       children: [
    //         {
    //           path: "/auth/login-1",
    //           label: t("sidebar.menuItem.login1"),
    //           target: "_blank",
    //         },
    //         {
    //           path: "/auth/login-2",
    //           label: t("sidebar.menuItem.login2"),
    //           target: "_blank",
    //         },
    //       ],
    //     },
    //     {
    //       label: t("sidebar.menu.signup"),
    //       collapsible: true,
    //       icon: "signup",
    //       children: [
    //         {
    //           path: "/auth/signup-1",
    //           label: t("sidebar.menuItem.signup1"),
    //           target: "_blank",
    //         },
    //         {
    //           path: "/auth/signup-2",
    //           label: t("sidebar.menuItem.signup2"),
    //           target: "_blank",
    //         },
    //       ],
    //     },
    //     {
    //       path: "/auth/forgot-password",
    //       label: t("sidebar.menuItem.forgetPassword"),
    //       icon: "forgot-password",
    //       target: "_blank",
    //     },
    //     {
    //       path: "/auth/reset-password",
    //       label: t("sidebar.menuItem.resetPassword"),
    //       icon: "reset-password",
    //       target: "_blank",
    //     },
    //   ],
    // },
    // {
    //   label: t("sidebar.menu.extraPages"),
    //   children: [
    //     {
    //       path: "/extra-pages/about-us",
    //       label: t("sidebar.menuItem.aboutUs"),
    //       icon: "about-us",
    //     },
    //     {
    //       path: "/extra-pages/contact-us",
    //       label: t("sidebar.menuItem.contactUs"),
    //       icon: "contact-us",
    //     },
    //     {
    //       path: "/extra-pages/call-outs",
    //       label: t("sidebar.menuItem.callOuts"),
    //       icon: "call-outs",
    //     },
    //     {
    //       path: "/extra-pages/pricing-plan",
    //       label: t("sidebar.menuItem.pricePlan"),
    //       icon: "pricing-plan",
    //     },
    //     {
    //       path: "/extra-pages/404",
    //       label: t("sidebar.menuItem.error404"),
    //       icon: "404",
    //       target: "_blank",
    //     },
    //     {
    //       path: "/extra-pages/500",
    //       label: t("sidebar.menuItem.error500"),
    //       icon: "500",
    //       target: "_blank",
    //     },
    //     {
    //       path: "/extra-pages/lock-screen",
    //       label: t("sidebar.menuItem.lockScreen"),
    //       icon: "lock-screen",
    //       target: "_blank",
    //     },
    //   ],
    // },
    {
      label: t("sidebar.menu.listView"),
      children: [
        {
          path: "/list-views/projects",
          label: t("sidebar.menuItem.projects"),
          icon: "projects-list",
        },
        {
          path: "/list-views/users",
          label: t("sidebar.menuItem.users"),
          icon: "users-list",
        },
      ],
    },
    // {
    //   label: t("sidebar.menu.gridView"),
    //   children: [
    //     {
    //       path: "/grid-views/projects",
    //       label: t("sidebar.menuItem.projects"),
    //       icon: "projects-grid",
    //     },
    //     {
    //       path: "/grid-views/users",
    //       label: t("sidebar.menuItem.users"),
    //       icon: "users-grid",
    //     },
    //   ],
    // },
  ];
}
