export type SideMenu = {
  type: "item";
  label: string;
  icon: string;
  href: string;
  permission: string;
} | {
  type: "item-tree";
  label: string;
  icon: string;
  permission: string;
  subitems: SubMenu[];
};

export type SubMenu = {
  label: string;
  href: string;
  permission: string;
}

export type UserMenu = {
  type: "item";
  label: string;
  href: string;
  permission: string;
} | {
  type: "item-tree";
  label: string;
  subitems: SubMenu[];
};
