export const MENUITEMS = [
  {
    menutitle: "DASHBOARD",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/Dashboard`,
        icon: "ti-home",
        type: "link",
        active: false,
        selected: false,
        title: "Dashboard",
      },
    ],
  },
  {
    menutitle: "Generals",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/Admission/0`,
        icon: "ti-files",
        type: "link",
        active: false,
        selected: false,
        title: "Admission",
      },
    ],
  },
];
