"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import ReleaseStepper from "@/components/admin/release/ReleaseStepper";
import MemberRadio from "@/components/admin/MemberRadio";
import DeparmentSearchFilter from "@/components/admin/manage-group/SearchFilter";
import ChooseMember from "@/components/admin/manage-group/ChooseMember";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { USER_OPTION_ID } from "@/consts/common";
import ChooseGroup from "@/components/admin/release/ChooseGroup";
import { LoadingButton } from "@mui/lab";
import ConfirmMember from "@/components/admin/manage-group/ConfirmMember";
import {
  CreateReleaseValidationSchema,
  CreatePageValidationSchema,
} from "@/validations/schema";
import {
  fetchDetailRelease,
  fetchEditRelease,
} from "@/store/thunks/admin/releaseThunk";
import ConfirmGroup from "@/components/admin/release/ConfirmGroup";
import {
  resetPageFile,
  setFile,
  setImages,
} from "@/store/slices/admin/mediaSlice";
import {
  setSelectedGroups,
  setSelectedUsers,
} from "@/store/slices/admin/groupSlice";
import ResourceInfo from "@/components/admin/resources/ResourceInfo";
import {
  fetchAllCategoryList,
  fetchDetailPage,
  fetchEditPage,
  fetchSubCategoryListByCategoryId,
} from "@/store/thunks/admin/resourcesThunk";

type PageParams = {
  id: string;
};

const EditPage = ({ params }: { params: PageParams }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, pageErrors, success, pageDetail } = useSelector(
    (state: RootState) => state.page
  );
  const { selectedDepartmentUsers, selectedGroupsDraft } = useSelector(
    (state: RootState) => state.group
  );
  const { uploadedfiles } = useSelector((state: RootState) => state.media);
  const [step, setStep] = useState<number>(0);
  const [selection, setSelection] = useState("video_url");
  const [userOptionId, setUserOptionId] = useState<string>(
    USER_OPTION_ID.ALL_USER
  );
  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchDetailPage(id));
    dispatch(fetchAllCategoryList());
  }, []);

  useEffect(() => {
    if (Object.keys(pageDetail).length != 0) {
      setUserOptionId(pageDetail.userOption.id.toString());
      dispatch(setSelectedGroups(pageDetail.groups));
      dispatch(setSelectedUsers(pageDetail.departments));
      imageFormat(pageDetail.file);
      formik.setValues({
        name: pageDetail.name,
        category_id: pageDetail.category.id.toString(),
        subcategory_id: pageDetail.subcategory.id.toString(),
        video_url: pageDetail.video_url ?? "",
        file: pageDetail.file ?? "",
      });
      if (pageDetail.video_url) {
        setSelection("video_url");
      } else {
        setSelection("file");
      }
    }
  }, [pageDetail]);

  const formik = useFormik({
    initialValues: {
      name: "",
      category_id: "",
      subcategory_id: "",
      video_url: "",
      file: "",
    },
    validationSchema: CreatePageValidationSchema,
    onSubmit: (values) => {
      const selectedUsersIds = selectedDepartmentUsers.map((item) => item.id);
      const selectedGroupIds = selectedGroupsDraft.map((item) => item.id);
      const formData = {
        name: values.name,
        user_option_id: parseInt(userOptionId),
        subcategory_id: parseInt(values.subcategory_id),
        video_url: selection == "video_url" ? values.video_url : "",
        file:
          selection == "file"
            ? uploadedfiles.length > 0
              ? uploadedfiles[0].serverId
              : pageDetail.file
            : null,
        user_ids:
          userOptionId == USER_OPTION_ID.SELECTED_USER ? selectedUsersIds : [], // get User id if the userOptionId is selectedUser
        group_ids: userOptionId == USER_OPTION_ID.GROUP ? selectedGroupIds : [], // get User id if the userOptionId is group
      };
      dispatch(
        fetchEditPage({
          id,
          formData,
        })
      );
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    if (success) {
      dispatch(resetPageFile());
      router.push("/admin/resources");
    }
  }, [success]);

  const imageFormat = async (file: any) => {
    const fileList: File[] = [];
    const response = await fetch(file);
    const blob = await response.blob();
    const filename = file.substring(file.lastIndexOf("/") + 1);
    const formattedFile = new File([blob], filename, { type: blob.type });
    fileList.push(formattedFile);
    dispatch(setFile(fileList));
  };

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 8,
          }}
        >
          <Typography variant="h6">Edit Resource</Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <ReleaseStepper step={step} />
        </Box>
        <Box>
          {step == 0 ? (
            <>
              <Box sx={{ marginBottom: 2 }}>
                <MemberRadio
                  setUserOptionId={setUserOptionId}
                  selected={userOptionId}
                />
              </Box>
              {userOptionId == USER_OPTION_ID.ALL_USER ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      sx={{ textTransform: "none" }}
                      onClick={() => setStep(1)}
                      variant="contained"
                      color="info"
                    >
                      Choose
                    </Button>
                  </Box>
                </>
              ) : userOptionId == USER_OPTION_ID.SELECTED_USER ? (
                <>
                  <DeparmentSearchFilter />
                  <ChooseMember setStep={setStep} />
                </>
              ) : (
                <ChooseGroup setStep={setStep} />
              )}
            </>
          ) : step == 1 ? (
            <>
              {userOptionId == USER_OPTION_ID.ALL_USER ? (
                <p className="text-center mt-16">All Users</p>
              ) : userOptionId == USER_OPTION_ID.SELECTED_USER ? (
                <ConfirmMember />
              ) : (
                <ConfirmGroup />
              )}
            </>
          ) : (
            <ResourceInfo
              formik={formik}
              selection={selection}
              setSelection={setSelection}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          {step == 1 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  mt: 2,
                }}
              >
                <Button
                  sx={{ textTransform: "none" }}
                  onClick={() => setStep(2)}
                  variant="contained"
                  color="info"
                >
                  Confirm
                </Button>
              </Box>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setStep(0)}
                variant="contained"
                color="info"
              >
                Go Back
              </Button>
            </>
          ) : step == 2 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  mt: 2,
                }}
              >
                <LoadingButton
                  sx={{ textTransform: "none" }}
                  type="submit"
                  loading={loading}
                  variant="contained"
                  color="info"
                >
                  Update
                </LoadingButton>
              </Box>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setStep(1)}
                variant="contained"
                color="info"
              >
                Go Back
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </form>
    </div>
  );
};

export default EditPage;
