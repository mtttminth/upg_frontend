# UPG Frontend Project Documentation

## 1. Project Overview

This project is a **Next.js 14** application built with **TypeScript**, designed to serve as a corporate portal with two distinct interfaces: an **Admin Panel** for management and a **User Portal** for employees. It utilizes **Material UI (MUI)** for the interface, **Redux Toolkit** for state management, and follows a service-oriented architecture for API interactions.

### Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI) v5](https://mui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Form Handling**: [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) (Validation)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authorization**: [CASL](https://casl.js.org/) (RBAC)
- **Styling**: SCSS modules, Tailwind CSS, and MUI Theming

---

## 2. Project Structure

The project follows a standard Next.js App Router structure with source code located in the `src` directory.

### Key Directories

- **`src/app`**: Contains the application routes and pages.
  - **`(user)`**: Routes for the User Portal (Employee interface).
  - **`admin`**: Routes for the Admin Panel.
- **`src/components`**: Reusable UI components, organized by feature (admin/user) and common utilities.
- **`src/services`**: API integration layer, separating API calls from UI logic.
- **`src/store`**: Redux store configuration, slices, and thunks.
- **`src/types`**: TypeScript type definitions and interfaces.
- **`src/validations`**: Yup validation schemas for forms.
- **`src/styles`**: Global styles, SCSS variables, and theme configurations.
- **`src/consts`**: Constant values, menu structures, and configuration objects.

---

## 3. Architecture & Core Features

### 3.1 Authentication & Middleware

The application implements a dual authentication system for Admins and Users.

- **Middleware**: [`src/middleware.ts`](src/middleware.ts) handles route protection. It checks for `admin` or `user` tokens in cookies and redirects unauthenticated users to their respective login pages.
- **Token Service**: [`src/services/tokenService.ts`](src/services/tokenService.ts) manages cookie-based token storage (set, get, remove).
- **Auth Services**:
  - Admin Auth: [`src/services/admin/authService.ts`](src/services/admin/authService.ts)
  - User Auth: [`src/services/user/authService.ts`](src/services/user/authService.ts)

### 3.2 State Management (Redux)

The project uses Redux Toolkit for global state management.

- **Store Configuration**: [`src/store/store.ts`](src/store/store.ts) combines reducers from both Admin and User slices.
- **Slices**: Located in `src/store/slices/`, these manage state for specific features (e.g., `authSlice`, `userSlice`, `resourceSlice`).
- **Thunks**: Located in `src/store/thunks/`, these handle asynchronous actions like API calls (e.g., [`src/store/thunks/admin/profileThunk.ts`](src/store/thunks/admin/profileThunk.ts)).

### 3.3 API Layer

API interactions are centralized using Axios.

- **Axios Instance**: [`src/services/admin/api.ts`](src/services/admin/api.ts) creates an Axios instance with interceptors to inject the Authorization header (Bearer token) and handle 401 Unauthorized responses globally.
- **Service Modules**: Individual service files (e.g., `departmentService.ts`, `releaseService.ts`) define specific API endpoints.

### 3.4 Authorization (RBAC)

Role-Based Access Control is implemented using CASL.

- **Ability Definition**: [`src/services/admin/ability.ts`](src/services/admin/ability.ts) defines user capabilities based on permissions fetched from the backend.
- **Permissions**: Constants for permissions are defined in [`src/consts/common.ts`](src/consts/common.ts).

---

## 4. Feature Modules

### 4.1 Admin Panel (`src/app/admin`)

The Admin Panel provides comprehensive management capabilities. The side menu structure is defined in [`src/consts/AdminsideMenu.ts`](src/consts/AdminsideMenu.ts).

#### Core Modules:

- **User Management**:
  - **Users**: Manage employee accounts ([`src/app/admin/(main)/(user-management)/user/page.tsx`](<src/app/admin/(main)/(user-management)/user/page.tsx>)).
  - **Departments**: Manage organizational departments.
  - **Roles**: Define roles and permissions.
  - **Groups**: Manage user groups.
  - **Admins**: Manage admin accounts.
- **Resource Management**:
  - Manage categories, sub-categories, and resources (files/videos).
  - **Validation Rule**: Resources must have either a `video_url` or a `file`, but not both. This is enforced in [`src/components/admin/resources/ResourceInfo.tsx`](src/components/admin/resources/ResourceInfo.tsx).
- **Internal Release**: Manage announcements and news.
- **Form Management**: Create and manage forms and form types.
- **Contract Management**: Manage contracts and contract types.
- **Content Management**: Manage Banners and "About Us" content.

### 4.2 User Portal (`src/app/(user)`)

The User Portal serves as the employee dashboard.

#### Core Modules:

- **Home/Dashboard**: Displays banners, latest releases, and resources ([`src/app/(user)/(main)/page.tsx`](<src/app/(user)/(main)/page.tsx>)).
- **Resources**: Access to company resources and documents.
- **Releases**: View internal announcements.
- **Forms**: Access and submit forms.
- **Contracts**: View contracts.
- **About**: View company policy, mission, and structure.

---

## 5. Data Models

Key type definitions are located in `src/types/`.

- **User**: [`src/types/user.ts`](src/types/user.ts) - Defines user structure (id, code, name, position, department, etc.).
- **Common**: [`src/types/common.ts`](src/types/common.ts) - Shared types like `Meta` (pagination) and `Links`.
- **Resource**: [`src/types/page.ts`](src/types/page.ts) - Types for resources, categories, and subcategories.
- **Form**: [`src/types/form.ts`](src/types/form.ts) - Types for form management.

---

## 6. Styling & UI

- **Theme**: Custom MUI themes are defined in [`src/styles/theme.ts`](src/styles/theme.ts) for both Admin and User interfaces, utilizing specific color palettes (Primary: `#202437`, Info: `#2F429C`).
- **Global Styles**: [`src/app/globals.css`](src/app/globals.css) and [`src/styles/main.scss`](src/styles/main.scss).
- **Layouts**:
  - **Root Layout**: [`src/app/layout.tsx`](src/app/layout.tsx) wraps the app with Redux Provider and MUI ThemeProvider.
  - **Admin Layout**: [`src/app/admin/(main)/layout.tsx`](<src/app/admin/(main)/layout.tsx>) includes the SideMenu and Navbar.

## 7. Configuration

- **Environment Variables**: Managed via `.env.development` and `.env.production`.
- **Next Config**: [`next.config.mjs`](next.config.mjs) exposes `API_BASE_URL` to the client side.
- **Package**: [`package.json`](package.json) lists dependencies including `@mui/material`, `@reduxjs/toolkit`, `formik`, `yup`, and `axios`.
