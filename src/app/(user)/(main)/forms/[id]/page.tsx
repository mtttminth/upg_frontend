"use client";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormDetail } from "@/store/thunks/user/formThunk";

type PageParams = {
  id: string;
};

const FormDetail = ({ params }: { params: PageParams }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, formDetail } = useSelector(
    (state: RootState) => state.userForm
  );
  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchFormDetail(id));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Box sx={{ px: 5, py: 2 }}>
          <Skeleton variant="rectangular" height="100vh" />
        </Box>
      ) : (
        <>
          {/* <Box className="subtitle-container">
            <Typography
              variant="h6"
              sx={{ pt: 6, mx: { xs: 2, md: 10 }, mb: 6 }}
            >
              Form
            </Typography>
          </Box> */}
          <Box
            sx={{ mt: 6, mx: { xs: 2, md: 10 }, mb: 8, position: "relative" }}
          >
            {/* <Typography variant="h1" sx={{ fontSize: 22, pb: 2 }}>
              {formDetail.name}
            </Typography>
            <Stack direction="row" sx={{ py: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: 14, color: "#91A5FF", pl: 0.5 }}
              >
                {formDetail.formType}
              </Typography>
            </Stack> */}
            {formDetail.file != "" ? (
              <iframe
                src={formDetail.file}
                title="PDF Viewer"
                style={{ width: "100%", height: "80vh", border: "none" }}
              ></iframe>
            ) : (
              <></>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default FormDetail;
