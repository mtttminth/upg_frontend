"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import ReleaseStepper from "@/components/admin/release/ReleaseStepper";
import MemberRadio from "@/components/admin/MemberRadio";
import ReleaseInfo from "@/components/admin/release/ReleaseInfo";
import DeparmentSearchFilter from "@/components/admin/manage-group/SearchFilter";
import ChooseMember from "@/components/admin/manage-group/ChooseMember";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { USER_OPTION_ID } from "@/consts/common";
import ChooseGroup from "@/components/admin/release/ChooseGroup";
import { LoadingButton } from "@mui/lab";
import ConfirmMember from "@/components/admin/manage-group/ConfirmMember";
import { CreateReleaseValidationSchema } from "@/validations/schema";
import {
  fetchDetailRelease,
  fetchEditRelease,
} from "@/store/thunks/admin/releaseThunk";
import ConfirmGroup from "@/components/admin/release/ConfirmGroup";
import { resetImages, setImages } from "@/store/slices/admin/mediaSlice";
import {
  setSelectedGroups,
  setSelectedUsers,
} from "@/store/slices/admin/groupSlice";

type PageParams = {
  id: string;
};

const EditRelease = ({ params }: { params: PageParams }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, releaseDetail } = useSelector(
    (state: RootState) => state.release
  );
  const { selectedDepartmentUsers } = useSelector(
    (state: RootState) => state.group
  );
  const { selectedGroupsDraft } = useSelector(
    (state: RootState) => state.group
  );
  const { images } = useSelector((state: RootState) => state.media);
  const [step, setStep] = useState<number>(0);
  const [userOptionId, setUserOptionId] = useState<string>(
    USER_OPTION_ID.ALL_USER
  );
  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchDetailRelease(id));
  }, []);

  useEffect(() => {
    if (Object.keys(releaseDetail).length != 0) {
      setUserOptionId(releaseDetail.userOption.id.toString());
      dispatch(setSelectedGroups(releaseDetail.groups));
      dispatch(setSelectedUsers(releaseDetail.departments));
      imageFormat(releaseDetail.images);
      formik.setValues({
        name: releaseDetail.name,
        release_status_id: releaseDetail.releaseStatus.id.toString(),
        video_url: releaseDetail.video_url ?? "",
        description: releaseDetail.description,
      });
    }
  }, [releaseDetail]);

  const formik = useFormik({
    initialValues: {
      name: "",
      release_status_id: "",
      video_url: "",
      description: "",
    },
    validationSchema: CreateReleaseValidationSchema,
    onSubmit: (values) => {
      const uploaded_images: string[] = [];
      images.map((image) => {
        uploaded_images.push(image.serverId);
      });
      const selectedUsersIds = selectedDepartmentUsers.map((item) => item.id);
      const selectedGroupIds = selectedGroupsDraft.map((item) => item.id);
      const formData = {
        name: values.name,
        user_option_id: parseInt(userOptionId),
        release_status_id: parseInt(values.release_status_id),
        video_url: values.video_url,
        description: values.description,
        images: uploaded_images,
        user_ids:
          userOptionId == USER_OPTION_ID.SELECTED_USER ? selectedUsersIds : [], // get User id if the userOptionId is selectedUser
        group_ids: userOptionId == USER_OPTION_ID.GROUP ? selectedGroupIds : [], // get User id if the userOptionId is group
      };
      dispatch(
        fetchEditRelease({
          id,
          formData,
        })
      );
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    if (success) {
      dispatch(resetImages());
      router.push("/admin/release");
    }
  }, [success]);

  const imageFormat = async (images: any) => {
    const fileList = await Promise.all(
      images.map(async (image: any) => {
        const imageUrl = image.source;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        return new File([blob], filename, { type: blob.type });
      })
    );
    dispatch(setImages(fileList));
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
          <Typography variant="h6">Edit Release</Typography>
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
            <ReleaseInfo formik={formik} />
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

export default EditRelease;
