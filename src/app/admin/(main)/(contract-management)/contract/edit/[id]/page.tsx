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
import { CreateContractValidationSchema } from "@/validations/schema";
import ConfirmGroup from "@/components/admin/release/ConfirmGroup";
import { resetPageFile, setFile } from "@/store/slices/admin/mediaSlice";
import { setSelectedGroups, setSelectedUsers } from "@/store/slices/admin/groupSlice";
import ContractInfo from "@/components/admin/contract/ContractInfo";
import { fetchAllTypeList, fetchDetailContract, fetchEditContract } from "@/store/thunks/admin/contractThunk";

type PageParams = {
  id: string;
}

const EditContract = ({ params }: { params: PageParams}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, contractErrors, success, contractDetail} = useSelector((state: RootState) => state.contract);
  const {selectedDepartmentUsers, selectedGroupsDraft} = useSelector((state: RootState) => state.group);
  const {uploadedfiles} = useSelector((state: RootState) => state.media);
  const [step, setStep] = useState<number>(0);
  const [userOptionId, setUserOptionId] = useState<string>(USER_OPTION_ID.ALL_USER);
  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchDetailContract(id));
    dispatch(fetchAllTypeList());
  }, []);
  
  useEffect(() => {
    if(Object.keys(contractDetail).length != 0) {
      setUserOptionId(contractDetail.userOption.id.toString());
      dispatch(setSelectedGroups(contractDetail.groups));
      dispatch(setSelectedUsers(contractDetail.departments));
      imageFormat(contractDetail.file);
      formik.setValues({
        name: contractDetail.name,
        contract_type_id: contractDetail.contractType.id.toString(),
      })
    }
  }, [contractDetail])

  const formik = useFormik({
    initialValues: {
      name: '',
      contract_type_id: '',
    },
    validationSchema: CreateContractValidationSchema,
    onSubmit: (values) => {
      const selectedUsersIds = selectedDepartmentUsers.map(item => item.id);
      const selectedGroupIds = selectedGroupsDraft.map(item => item.id);
      const formData = {
        name: values.name,
        user_option_id: parseInt(userOptionId),
        contract_type_id: parseInt(values.contract_type_id),
        file: uploadedfiles[0].serverId,
        user_ids: userOptionId == USER_OPTION_ID.SELECTED_USER ? selectedUsersIds : [], // get User id if the userOptionId is selectedUser
        group_ids: userOptionId == USER_OPTION_ID.GROUP ? selectedGroupIds : [], // get User id if the userOptionId is group
      }
      dispatch(fetchEditContract({
        id,
        formData
      }));
    },
    enableReinitialize: true,
  })
  useEffect(() => {
    if(success) {
      dispatch(resetPageFile());
      router.push('/admin/contract');
    }
  }, [success])

  const imageFormat = async (file: any) => {
    const fileList: File[] = [];
    const response = await fetch(file);
    const blob = await response.blob();
    const filename = file.substring(file.lastIndexOf('/') + 1);
    const formattedFile = new File([blob], filename, { type: blob.type });
    fileList.push(formattedFile);
    dispatch(setFile(fileList));
  }

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 8 }}>
          <Typography variant="h6">Edit Contract</Typography>
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
            <ContractInfo formik={formik}/>
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
                  Update
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

export default EditContract;
