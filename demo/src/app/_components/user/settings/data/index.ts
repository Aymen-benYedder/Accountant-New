interface SettingOptionProps {
  label: string;
  data: {
    name: string;
    slug: string;
  }[];
}
const settingOptions: SettingOptionProps[] = [
  {
    label: "Account",
    data: [
      {
        name: "Public Profile",
        slug: "public-profile",
      },
      { name: "Team", slug: "team" },
      {
        name: "Active Login Devices",
        slug: "login-devices",
      },
      {
        name: "Organizations",
        slug: "organizations",
      },
    ],
  },
  {
    label: "Access",
    data: [
      { name: "Emails", slug: "emails" },
      {
        name: "Change Password",
        slug: "reset-password",
      },
      {
        name: "2 Factor Auth",
        slug: "2-factor-auth",
      },
    ],
  },
  {
    label: "Financials",
    data: [
      {
        name: "Membership & Plans",
        slug: "membership-plans",
      },
      {
        name: "Payment Methods",
        slug: "payment-methods",
      },
      {
        name: "Invoices",
        slug: "invoices",
      },
      { name: "Statements", slug: "statements" },
    ],
  },
  {
    label: "Preferences",
    data: [
      {
        name: "Advertising",
        slug: "advertising",
      },
      {
        name: "Notifications",
        slug: "notifications",
      },
    ],
  },
];

export { settingOptions, type SettingOptionProps };
