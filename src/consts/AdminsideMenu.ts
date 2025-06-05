import { SideMenu, UserMenu } from "@/types/menu";
import { Permission } from "./common";

export const DRAWER_WIDTH = 270;

export const SIDE_MENU_ITEM: SideMenu[] = [
  {
    type: 'item-tree',
    label: 'User Management',
    icon: 'user.svg',
    permission: Permission.DEPARTMENT_VIEW,
    subitems: [
      {
        label: 'Department',
        href: 'department',
        permission: Permission.DEPARTMENT_VIEW,
      },
      {
        label: 'Manage Role',
        href: 'role',
        permission: Permission.ROLE_VIEW,
      },
      {
        label: 'Manage Admin',
        href: 'admin',
        permission: Permission.ADMIN_VIEW,
      },
      {
        label: 'Manage User',
        href: 'user',
        permission: Permission.USER_VIEW,
      },
      {
        label: 'Manage Group',
        href: 'group',
        permission: Permission.GROUP_VIEW,
      },
    ],
  },
  {
    type: 'item',
    label: 'Internal Release',
    icon: 'release.svg',
    href: 'release',
    permission: Permission.ANNOUNCEMENT_VIEW,
  },
  {
    type: 'item-tree',
    label: 'Resource Management',
    icon: 'page.svg',
    permission: Permission.PAGE_VIEW,
    subitems: [
      {
        label: 'Categories',
        href: 'resources/categories',
        permission: Permission.PAGE_VIEW,
      },
      {
        label: 'SubCategories',
        href: 'resources/sub-categories',
        permission: Permission.PAGE_VIEW,
      },
      {
        label: 'Resource',
        href: 'resources',
        permission: Permission.PAGE_VIEW,
      },
    ],
  },
  {
    type: 'item-tree',
    label: 'Form Management',
    icon: 'form.svg',
    permission: Permission.FORM_VIEW,
    subitems: [
      {
        label: 'Type',
        href: 'form-type',
        permission: Permission.FORM_VIEW,
      },
      {
        label: 'Form',
        href: 'form',
        permission: Permission.FORM_VIEW,
      },
    ],
  },
  {
    type: 'item-tree',
    label: 'Contract Management',
    icon: 'form.svg',
    permission: Permission.CONTRACT_VIEW,
    subitems: [
      {
        label: 'Type',
        href: 'contract-type',
        permission: Permission.CONTRACT_VIEW,
      },
      {
        label: 'Contract',
        href: 'contract',
        permission: Permission.CONTRACT_VIEW,
      },
    ],
  },
  {
    type: 'item',
    label: 'Banner',
    icon: 'banner.svg',
    href: 'banner',
    permission: Permission.ANNOUNCEMENT_VIEW,
  },
  {
    type: 'item',
    label: 'About Us',
    icon: 'about.svg',
    href: 'about-us',
    permission: Permission.ANNOUNCEMENT_VIEW,
  },
];

export const USER_MENU_ITEM: UserMenu[] = [
  {
    type: 'item',
    label: 'Home',
    href: '',
    permission: '',
  },
  {
    type: 'item-tree',
    label: 'Company Policy & Mission',
    subitems: [
      {
        label: 'Policy & Mission',
        href: 'about/policy_and_mission',
        permission: '',
      },
      {
        label: 'Our Five Commitments',
        href: 'about/our_commitments',
        permission: '',
      },
      {
        label: 'Company Profile Video',
        href: 'about/company_profile_video',
        permission: '',
      },
      {
        label: 'Company Organization Structure',
        href: 'about/company_organization_structure',
        permission: '',
      },
    ]
  },
  {
    type: 'item',
    label: 'Resources',
    href: 'resources',
    permission: '',
  },
  {
    type: 'item',
    label: 'Internal Releases',
    href: 'releases',
    permission: '',
  },
  {
    type: 'item',
    label: 'Leave',
    href: 'leave',
    permission: '',
  },
]