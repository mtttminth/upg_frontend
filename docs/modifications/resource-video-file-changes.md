## Resource Video and File Changes Documentation

This document outlines the recent modifications made to the resource creation and editing forms to enforce backend validation rules.

### Purpose of Changes

The primary purpose of these changes is to enforce a critical backend validation rule: a resource must have either a `video_url` or a `file` attached, but **not both**. This ensures data integrity and consistency for resource management.

### Modified Files and Summary of Changes

#### 1. [`src/components/admin/resources/ResourceInfo.tsx`](src/components/admin/resources/ResourceInfo.tsx)

**Summary of Changes:**
This component, responsible for rendering the input fields for resource information, was updated to include conditional logic for the `video_url` and file upload (`file`) fields.

- **Conditional Disabling:** When a `video_url` is provided, the file upload input is now disabled. Conversely, if a file is uploaded, the `video_url` input is disabled. This prevents users from entering data into both fields simultaneously, directly addressing the backend validation constraint.
- **User Experience:** The changes improve the user experience by providing immediate visual feedback and preventing invalid input combinations at the UI level.

#### 2. [`src/app/admin/(main)/resources/create/page.tsx`](<src/app/admin/(main)/resources/create/page.tsx>)

**Summary of Changes:**
This page, which handles the creation of new resources, was updated to integrate and respect the new validation logic implemented in `ResourceInfo.tsx`.

- **Form Integration:** The form submission logic on this page now implicitly relies on the conditional disabling within `ResourceInfo.tsx` to ensure that only one of `video_url` or `file` is present when the form data is prepared for submission to the backend.
- **Error Handling (Implicit):** While explicit error messages for "both fields populated" might be handled by the backend, the UI changes in `ResourceInfo.tsx` prevent this scenario from occurring in the first place, leading to cleaner data submission.

#### 3. [`src/app/admin/(main)/resources/edit/[id]/page.tsx`](<src/app/admin/(main)/resources/edit/[id]/page.tsx>)

**Summary of Changes:**
Similar to the create page, this page, responsible for editing existing resources, was updated to incorporate the same validation and conditional logic for `video_url` and `file`.

- **Consistency with Create Form:** The editing experience now mirrors the creation experience, ensuring that existing resources can also be updated while adhering to the `video_url` or `file` exclusivity rule.
- **Data Persistence:** When an existing resource is loaded, the component correctly identifies if it has a `video_url` or a `file` and disables the alternative input field accordingly, preventing accidental invalid updates.

#### 4. [`src/consts/common.ts`](src/consts/common.ts)

**Summary of Changes:**
A new `resource` object was added to this file. This object provides constants for the "Video URL" and "File Upload" options, specifically `VIDEO_URL` and `FILE_UPLOAD`.

- **Avoid Hardcoding:** By defining these values as constants, the application avoids hardcoding strings directly in the code.
- **Improved Maintainability:** Using constants makes the codebase easier to maintain. If the values for "Video URL" or "File Upload" ever need to change, they can be updated in a single, central location (`src/consts/common.ts`) rather than searching and replacing multiple instances throughout the application. This reduces the risk of errors and speeds up future modifications.
