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
import { CreateFormValidationSchema } from "@/validations/schema";
import ConfirmGroup from "@/components/admin/release/ConfirmGroup";
import { resetPageFile } from "@/store/slices/admin/mediaSlice";
import { fetchAllTypeList, fetchCreateForm } from "@/store/thunks/admin/formThunk";
import FormInfo from "@/components/admin/form/FormInfo";

const CreateForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {selectedDepartmentUsers, selectedGroupsDraft} = useSelector((state: RootState) => state.group);
  const {loading, formErrors, success} = useSelector((state: RootState) => state.form);
  const {uploadedfiles} = useSelector((state: RootState) => state.media);
  const [step, setStep] = useState<number>(0);
  const [userOptionId, setUserOptionId] = useState<string>(USER_OPTION_ID.ALL_USER);
  const formik = useFormik({
    initialValues: {
      name: '',
      form_type_id: '',
    },
    validationSchema: CreateFormValidationSchema,
    onSubmit: (values) => {
      const selectedUsersIds = selectedDepartmentUsers.map(item => item.id);
      const selectedGroupIds = selectedGroupsDraft.map(item => item.id);
      const formData = {
        name: values.name,
        user_option_id: parseInt(userOptionId),
        form_type_id: parseInt(values.form_type_id),
        file: uploadedfiles[0].serverId,
        user_ids: userOptionId == USER_OPTION_ID.SELECTED_USER ? selectedUsersIds : [], // get User id if the userOptionId is selectedUser
        group_ids: userOptionId == USER_OPTION_ID.GROUP ? selectedGroupIds : [], // get User id if the userOptionId is group
      }
      dispatch(fetchCreateForm(formData));
    },
    enableReinitialize: true,
  })
  useEffect(() => {
    dispatch(fetchAllTypeList());
  }, [])
  useEffect(() => {
    if(success) {
      dispatch(resetPageFile());
      router.push('/admin/form');
    }
  }, [success])

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 8 }}>
          <Typography variant="h6">Create Form</Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <ReleaseStepper step={step} />
        </Box>
        <Box>
          {step == 0 ? (
            <> 
              <Box sx={{marginBottom: 2,}}>
                <MemberRadio setUserOptionId={setUserOptionId} selected={userOptionId} />
              </Box>
              {userOptionId == USER_OPTION_ID.ALL_USER ? (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Button sx={{textTransform: 'none'}} onClick={() => setStep(1)} variant="contained" color="info">
                      Choose
                    </Button>
                  </Box>
                </>
              ) : userOptionId == USER_OPTION_ID.SELECTED_USER ? (
                <>
                  <DeparmentSearchFilter />
                  <ChooseMember setStep={setStep}/>
                </>
              ) : (
                <ChooseGroup setStep={setStep} />
              )}
            </>
          ) : step == 1 ? (
            <>
              {
                userOptionId == USER_OPTION_ID.ALL_USER ? (
                  <p className="text-center mt-16">All Users</p>
                ) : userOptionId == USER_OPTION_ID.SELECTED_USER ? (
                  <ConfirmMember />
                ) : (
                  <ConfirmGroup />
                )
              }
            </>
          ) : (
            <FormInfo formik={formik}/>
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 2 }}>
                <Button sx={{textTransform: 'none'}} onClick={() => setStep(2)} variant="contained" color="info">
                  Confirm
                </Button>
              </Box>
              <Button sx={{textTransform: 'none'}} onClick={() => setStep(0)} variant="contained" color="info">
                Go Back
              </Button>
            </>
          ) : step == 2 ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 2 }}>
                <LoadingButton
                  sx={{textTransform: 'none'}}
                  type="submit" 
                  loading={loading}
                  variant="contained"
                  color="info"
                >
                  Create
                </LoadingButton>
              </Box>
              <Button sx={{textTransform: 'none'}} onClick={() => setStep(1)} variant="contained" color="info">
                Go Back
              </Button>
            </>
          ) : (<></>)}
        </Box>
      </form>
    </div>
  );
};

export default CreateForm;
