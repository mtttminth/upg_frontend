export const ADMIN = "admin";
export const USER = "user";

export const rowsPerPageOptions = [5, 10, 25, 50, 100];

export const Permission = {
  DEPARTMENT_CREATE: "department_create",
  DEPARTMENT_EDIT: "department_edit",
  DEPARTMENT_DELETE: "department_delete",
  DEPARTMENT_VIEW: "department_view",
  ROLE_CREATE: "role_create",
  ROLE_EDIT: "role_edit",
  ROLE_DELETE: "role_delete",
  ROLE_VIEW: "role_view",
  ADMIN_CREATE: "admin_create",
  ADMIN_EDIT: "admin_edit",
  ADMIN_DELETE: "admin_delete",
  ADMIN_VIEW: "admin_view",
  USER_CREATE: "user_create",
  USER_EDIT: "user_edit",
  USER_DELETE: "user_delete",
  USER_VIEW: "user_view",
  GROUP_CREATE: "group_create",
  GROUP_EDIT: "group_edit",
  GROUP_DELETE: "group_delete",
  GROUP_VIEW: "group_view",
  ANNOUNCEMENT_CREATE: "release_create",
  ANNOUNCEMENT_EDIT: "release_edit",
  ANNOUNCEMENT_DELETE: "release_delete",
  ANNOUNCEMENT_VIEW: "release_view",
  PAGE_CREATE: "resource_create",
  PAGE_EDIT: "resource_edit",
  PAGE_DELETE: "resource_delete",
  PAGE_VIEW: "resource_view",
  FORM_CREATE: "form_create",
  FORM_EDIT: "form_edit",
  FORM_DELETE: "form_delete",
  FORM_VIEW: "form_view",
  CONTRACT_CREATE: "contract_create",
  CONTRACT_EDIT: "contract_edit",
  CONTRACT_DELETE: "contract_delete",
  CONTRACT_VIEW: "contract_view",

  BANNER_EDIT: "banner_edit",
  ABOUT_US_EDIT: "about_us_edit",
};

export const managementSections = [
  {
    title: "Department",
    permissions: [
      { label: "Create", value: "department_create" },
      { label: "Edit", value: "department_edit" },
      { label: "Delete", value: "department_delete" },
      { label: "View", value: "department_view" },
    ],
  },
  {
    title: "Role",
    permissions: [
      { label: "Create", value: "role_create" },
      { label: "Edit", value: "role_edit" },
      { label: "Delete", value: "role_delete" },
      { label: "View", value: "role_view" },
    ],
  },
  {
    title: "Admin",
    permissions: [
      { label: "Create", value: "admin_create" },
      { label: "Edit", value: "admin_edit" },
      { label: "Delete", value: "admin_delete" },
      { label: "View", value: "admin_view" },
    ],
  },
  {
    title: "User",
    permissions: [
      { label: "Create", value: "user_create" },
      { label: "Edit", value: "user_edit" },
      { label: "Delete", value: "user_delete" },
      { label: "View", value: "user_view" },
    ],
  },
  {
    title: "Group",
    permissions: [
      { label: "Create", value: "group_create" },
      { label: "Edit", value: "group_edit" },
      { label: "Delete", value: "group_delete" },
      { label: "View", value: "group_view" },
    ],
  },
  {
    title: "Release Management",
    permissions: [
      { label: "Create", value: "release_create" },
      { label: "Edit", value: "release_edit" },
      { label: "Delete", value: "release_delete" },
      { label: "View", value: "release_view" },
    ],
  },
  {
    title: "Resource Management",
    permissions: [
      { label: "Create", value: "resource_create" },
      { label: "Edit", value: "resource_edit" },
      { label: "Delete", value: "resource_delete" },
      { label: "View", value: "resource_view" },
    ],
  },
  {
    title: "Contracts",
    permissions: [
      { label: "Create", value: "contract_create" },
      { label: "Edit", value: "contract_edit" },
      { label: "Delete", value: "contract_delete" },
      { label: "View", value: "contract_view" },
    ],
  },
  {
    title: "Form",
    permissions: [
      { label: "Create", value: "form_create" },
      { label: "Edit", value: "form_edit" },
      { label: "Delete", value: "form_delete" },
      { label: "View", value: "form_view" },
    ],
  },
];

export const USER_OPTION_ID = {
  ALL_USER: "1",
  SELECTED_USER: "2",
  GROUP: "3",
};

export const ANNOUNCEMENT_STATUS = {
  IMPORTANT: "1",
  WARNIND: "2",
  NORMAL: "3",
};

export const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];
export const MODULES = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const resource = {
  VIDEO_URL: "video_url",
  FILE_UPLOAD: "file_upload",
};
