"use client";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBanner } from "@/store/thunks/user/homeThunk";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserBannerComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, banner, success, homeMessage, homeErrors } = useSelector(
    (state: RootState) => state.userHome
  );

  useEffect(() => {
    dispatch(fetchBanner());
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          <Box>
            <Image
              src={banner.image}
              unoptimized
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
              alt="Banner"
            />
          </Box>
          <Typography variant="h5" textAlign={"center"} mt={1} color={"grey"} className="banner-text">
            “Your Source for Company Knowledge”
          </Typography>
        </>
      )}
    </div>
  );
};

export default UserBannerComponent;
