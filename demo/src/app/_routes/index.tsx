import { Page } from "@app/_components/_core";
import { AuthGuard } from "@app/_components/_core/AuthGuard/AuthGuard";
import WebSocketTest from "@app/_components/WebSocketTest/WebSocketTest";
import {
  ActiveLogin,
  AdvertisingSettings,
  EmailAccessSettings,
  InvoiceSettings,
  MembershipPlans,
  NotificationSettings,
  OrganizationSettings,
  PaymentMethodSettings,
  ResetPasswordSettings,
  StatementSettings,
  TeamSettings,
  TwoFactorAuth,
} from "@app/_components/user/settings";
import { SettingsLayout } from "@app/_layouts/SettingsLayout";
import { SoloLayout } from "@app/_layouts/SoloLayout";
import { StretchedLayout } from "@app/_layouts/StretchedLayout";
import ChatsPage from "@app/pages/apps/chats";
import ContactsPage from "@app/pages/apps/contacts";
import InvoicePage1 from "@app/pages/apps/invoice-1";
import MailAppPage from "@app/pages/apps/mails";
import ForgotPassword from "@app/pages/auth/forgot-password";
import Login1 from "@app/pages/auth/login1";
import Login2 from "@app/pages/auth/login2";
import ResetPassword from "@app/pages/auth/reset-password";
import Signup1 from "@app/pages/auth/signup1";
import Signup2 from "@app/pages/auth/signup2";
import CrmPage from "@app/pages/dashboards/crm";
import CryptoPage from "@app/pages/dashboards/crypto";
import EcommercePage from "@app/pages/dashboards/ecommerce";
import IntranetPage from "@app/pages/dashboards/intranet";
import ListingPage from "@app/pages/dashboards/listing";
import MiscPage from "@app/pages/dashboards/misc";
import NewsPage from "@app/pages/dashboards/news";
import DnDPage from "@app/pages/extensions/dnd";
import DropzonePage from "@app/pages/extensions/dropzone";
import CkEditorPage from "@app/pages/extensions/editors/ck";
import WysiwygEditorPage from "@app/pages/extensions/editors/wysiwyg";
import SweetAlertsPage from "@app/pages/extensions/sweet-alert";
import NotFoundErrorPage from "@app/pages/extra-pages/404";
import InternalServerErrorPage from "@app/pages/extra-pages/500";
import AboutUsPage from "@app/pages/extra-pages/about-us";
import CallOutsPage from "@app/pages/extra-pages/call-outs";
import ContactUsPage from "@app/pages/extra-pages/contact-us";
import LockScreenPage from "@app/pages/extra-pages/lock-screen";
import PricingPlanPage from "@app/pages/extra-pages/pricing-plan";
import ProjectsGridPage from "@app/pages/grid-views/projects";
import UsersGridPage from "@app/pages/grid-views/users";
import ProjectsListPage from "@app/pages/list-views/projects";
import UsersListPage from "@app/pages/list-views/users";
import MetricsPage from "@app/pages/metrics";
import BasicCalendarPage from "@app/pages/modules/calendars/basic";
import CultureCalendarPage from "@app/pages/modules/calendars/culture";
import PopupCalendarPage from "@app/pages/modules/calendars/popup";
import RenderingCalendarPage from "@app/pages/modules/calendars/rendering";
import SelectableCalendarPage from "@app/pages/modules/calendars/selectable";
import TimeslotCalendarPage from "@app/pages/modules/calendars/timeslot";
import AreaChartPage from "@app/pages/modules/charts/area";
import BarChartPage from "@app/pages/modules/charts/bar";
import ComposedChartPage from "@app/pages/modules/charts/composed";
import LineChartPage from "@app/pages/modules/charts/line";
import PieChartPage from "@app/pages/modules/charts/pie";
import RadarChartPage from "@app/pages/modules/charts/radar";
import RadialChartPage from "@app/pages/modules/charts/radial";
import ScatterChartPage from "@app/pages/modules/charts/scatter";
import TreeMapChartPage from "@app/pages/modules/charts/treemap";
import DirectionsMapPage from "@app/pages/modules/maps/directions";
import DrawingViewMapPage from "@app/pages/modules/maps/drawing";
import GeoLocationMapPage from "@app/pages/modules/maps/geo-location";
import KmLayerMapPage from "@app/pages/modules/maps/kml";
import OverlayMapPage from "@app/pages/modules/maps/overlay";
import PopupInfoMapPage from "@app/pages/modules/maps/popup-info";
import SimpleMapPage from "@app/pages/modules/maps/simple";
import StreetViewPanoramaPage from "@app/pages/modules/maps/street-view";
import StyledMapPage from "@app/pages/modules/maps/styled";
import OnboardingPage1 from "@app/pages/onboarding-1";
import OnboardingPage2 from "@app/pages/onboarding-2";
import OnboardingPage3 from "@app/pages/onboarding-3";
import UserProfile from "@app/pages/user/profile-1";
import ProfilePage1 from "@app/pages/user/profile-2";
import ProfilePage2Dynamic from "@app/pages/user/profile-2/[id].tsx";
import ProfilePage2 from "@app/pages/user/profile-3";
import ProfilePage3 from "@app/pages/user/profile-4";
import PublicProfile from "@app/pages/user/settings/public-profile";
import SocialWallApp from "@app/pages/user/social-wall";
import CompanyProfilePage from "@app/pages/company/profile";
import CompanyStoragePage from "@app/pages/company/profile/storage";
import { WidgetsPage } from "@app/pages/widgets";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  // Public routes
  {
    path: "/auth",
    element: <SoloLayout />,
    children: [
      { path: "login-1", element: <Login1 /> },
      { path: "login-2", element: <Login2 /> },
      { path: "signup-1", element: <Signup1 /> },
      { path: "signup-2", element: <Signup2 /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/extra-pages",
    element: <SoloLayout />,
    children: [
      { path: "404", element: <NotFoundErrorPage /> },
      { path: "500", element: <InternalServerErrorPage /> },
      { path: "lock-screen", element: <LockScreenPage /> },
    ],
  },

  // Protected routes
  {
    element: <AuthGuard />,
    children: [
      {
        path: "",
        element: <StretchedLayout />,
        children: [
          { index: true, element: <Page Component={MiscPage} /> },
          { path: "company/profile/:id", element: <Page Component={CompanyProfilePage} /> },
          { path: "company/profile/:id/storage", element: <Page Component={CompanyStoragePage} /> },
          { path: "dashboards/misc", element: <Page Component={MiscPage} /> },
          { path: "dashboards/crypto", element: <Page Component={CryptoPage} /> },
          { path: "dashboards/listing", element: <Page Component={ListingPage} /> },
          { path: "dashboards/crm", element: <Page Component={CrmPage} /> },
          { path: "dashboards/intranet", element: <Page Component={IntranetPage} /> },
          { path: "dashboards/ecommerce", element: <Page Component={EcommercePage} /> },
          { path: "dashboards/news", element: <Page Component={NewsPage} /> },
          { path: "widgets", element: <Page Component={WidgetsPage} /> },
          { path: "metrics", element: <Page Component={MetricsPage} /> },
          { path: "apps/chat", element: <Page Component={ChatsPage} /> },
          { path: "apps/chat/:chatBy/:id", element: <Page Component={ChatsPage} /> },
          { path: "apps/contact", element: <Page Component={ContactsPage} /> },
          { path: "apps/contact/:category", element: <Page Component={ContactsPage} /> },
          { path: "apps/contact/label/:labelID", element: <Page Component={ContactsPage} /> },
          { path: "apps/mail/:category", element: <Page Component={MailAppPage} /> },
          { path: "apps/mail/message/:mailID", element: <Page Component={MailAppPage} /> },
          { path: "apps/mail/label/:labelID", element: <Page Component={MailAppPage} /> },
          { path: "apps/invoice", element: <Page Component={InvoicePage1} /> },
          { path: "extensions/editors/ck", element: <Page Component={CkEditorPage} /> },
          { path: "extensions/editors/wysiwyg", element: <Page Component={WysiwygEditorPage} /> },
          { path: "extensions/dnd", element: <Page Component={DnDPage} /> },
          { path: "extensions/dropzone", element: <Page Component={DropzonePage} /> },
          { path: "extensions/sweet-alert", element: <Page Component={SweetAlertsPage} /> },
          { path: "modules/calendars/basic", element: <Page Component={BasicCalendarPage} /> },
          { path: "modules/calendars/culture", element: <Page Component={CultureCalendarPage} /> },
          { path: "modules/calendars/popup", element: <Page Component={PopupCalendarPage} /> },
          { path: "modules/calendars/rendering", element: <Page Component={RenderingCalendarPage} /> },
          { path: "modules/calendars/selectable", element: <Page Component={SelectableCalendarPage} /> },
          { path: "modules/calendars/timeslot", element: <Page Component={TimeslotCalendarPage} /> },
          { path: "modules/charts/line", element: <Page Component={LineChartPage} /> },
          { path: "modules/charts/bar", element: <Page Component={BarChartPage} /> },
          { path: "modules/charts/area", element: <Page Component={AreaChartPage} /> },
          { path: "modules/charts/composed", element: <Page Component={ComposedChartPage} /> },
          { path: "modules/charts/pie", element: <Page Component={PieChartPage} /> },
          { path: "modules/charts/scatter", element: <Page Component={ScatterChartPage} /> },
          { path: "modules/charts/radial", element: <Page Component={RadialChartPage} /> },
          { path: "modules/charts/radar", element: <Page Component={RadarChartPage} /> },
          { path: "modules/charts/treemap", element: <Page Component={TreeMapChartPage} /> },
          { path: "modules/maps/simple", element: <Page Component={SimpleMapPage} /> },
          { path: "modules/maps/styled", element: <Page Component={StyledMapPage} /> },
          { path: "modules/maps/geo-location", element: <Page Component={GeoLocationMapPage} /> },
          { path: "modules/maps/directions", element: <Page Component={DirectionsMapPage} /> },
          { path: "modules/maps/overlay", element: <Page Component={OverlayMapPage} /> },
          { path: "modules/maps/kml", element: <Page Component={KmLayerMapPage} /> },
          { path: "modules/maps/popup-info", element: <Page Component={PopupInfoMapPage} /> },
          { path: "modules/maps/street-view", element: <Page Component={StreetViewPanoramaPage} /> },
          { path: "modules/maps/drawing", element: <Page Component={DrawingViewMapPage} /> },
          { path: "extra-pages/about-us", element: <Page Component={AboutUsPage} /> },
          { path: "extra-pages/contact-us", element: <Page Component={ContactUsPage} /> },
          { path: "extra-pages/call-outs", element: <Page Component={CallOutsPage} /> },
          { path: "extra-pages/pricing-plan", element: <Page Component={PricingPlanPage} /> },
          { path: "user/profile-1", element: <Page Component={UserProfile} /> },
          { path: "user/profile-2", element: <Page Component={ProfilePage1} /> },
          { path: "user/profile-2/:id", element: <Page Component={ProfilePage2Dynamic} /> },
          { path: "user/profile-3", element: <Page Component={ProfilePage2} /> },
          { path: "user/profile-4", element: <Page Component={ProfilePage3} /> },
          { path: "websocket-test", element: <Page Component={WebSocketTest} /> },
          { path: "*", element: <div style={{ color: "red", padding: 32, textAlign: "center", fontSize: 24 }}>NO ROUTE MATCHED</div> },
          { path: "/user/social-wall", element: <Page Component={SocialWallApp} /> },
          {
            path: "/user/settings",
            element: <SettingsLayout />,
            children: [
              { path: "public-profile", element: <Page Component={PublicProfile} /> },
              { path: "team", element: <Page Component={TeamSettings} /> },
              { path: "login-devices", element: <Page Component={ActiveLogin} /> },
              { path: "organizations", element: <Page Component={OrganizationSettings} /> },
              { path: "emails", element: <Page Component={EmailAccessSettings} /> },
              { path: "reset-password", element: <Page Component={ResetPasswordSettings} /> },
              { path: "2-factor-auth", element: <Page Component={TwoFactorAuth} /> },
              { path: "membership-plans", element: <Page Component={MembershipPlans} /> },
              { path: "payment-methods", element: <Page Component={PaymentMethodSettings} /> },
              { path: "invoices", element: <Page Component={InvoiceSettings} /> },
              { path: "statements", element: <Page Component={StatementSettings} /> },
              { path: "advertising", element: <Page Component={AdvertisingSettings} /> },
              { path: "notifications", element: <Page Component={NotificationSettings} /> },
            ],
          },
          { path: "/list-views/projects", element: <Page Component={ProjectsListPage} /> },
          { path: "/list-views/users", element: <Page Component={UsersListPage} /> },
          { path: "/grid-views/projects", element: <Page Component={ProjectsGridPage} /> },
          { path: "/grid-views/users", element: <Page Component={UsersGridPage} /> },
          { path: "/onboarding-1", element: <Page Component={OnboardingPage1} /> },
          { path: "/onboarding-2", element: <Page Component={OnboardingPage2} /> },
          { path: "/onboarding-3", element: <Page Component={OnboardingPage3} /> },
          { path: "*", element: <NotFoundErrorPage /> },
        ],
      },
    ],
  },
];

routes.push({
  path: "*",
  element: <div style={{ color: "magenta", padding: 32, fontSize: 28 }}>TOP LEVEL: NO ROUTE MATCHED</div>,
  children: []
});
export const router = createBrowserRouter(routes);
