"use client";
import { AppDispatch, RootState } from "@/store/store";
import { fetchContractDetail } from "@/store/thunks/user/contractThunk";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type PageParams = {
  id: string;
};

const ContractDetail = ({ params }: { params: PageParams }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, contractDetail } = useSelector(
    (state: RootState) => state.userContract
  );
  const id = parseInt(params.id);

  useEffect(() => {
    dispatch(fetchContractDetail(id));
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
              {contractDetail.name}
            </Typography>
            <Stack direction="row" sx={{ py: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: 14, color: "#91A5FF", pl: 0.5 }}
              >
                {contractDetail.contractType}
              </Typography>
            </Stack> */}
            {contractDetail.file != "" ? (
              <iframe
                src={contractDetail.file}
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

export default ContractDetail;
