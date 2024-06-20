import type { MenuItem } from "@/common/types";

export const HeaderMenuItem: MenuItem[] = [
  {
    title: "Organization",
    src: "/icons/organisation.svg",
    action: () => {
      alert("Organizations HomePage!");
    },
  },
  {
    title: "Settings",
    src: "/icons/settings.svg",
    action: () => {
      alert("Settings HomePage!");
    },
  },
];
