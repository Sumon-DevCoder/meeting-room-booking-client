import { ReactNode } from "react";

// sidebar type
export type TSidebarItem = {
  icon: ReactNode;
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

// route type
export type TRoutes = {
  path: string;
  element: ReactNode;
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
