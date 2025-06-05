"use client";
import { updateParams } from "@/store/slices/user/releaseSlice";
import { AppDispatch, RootState } from "@/store/store";
import { fetchReleaseList } from "@/store/thunks/user/releaseThunk";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { readableFormatDate } from "@/utils/common";
import UserReleaseFilter from "@/components/user/release/Filter";
import { AnimationWrapper } from "react-hover-animation";
import { markNotificationAsRead } from "@/store/slices/user/authSlice";

const UserRelease = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, releaseParams, releaseList, success, releaseMessage } =
    useSelector((state: RootState) => state.userRelease);
  const [page, setPage] = useState<number>(releaseParams.page);
  const [perPage, setPerPage] = useState<number>(releaseParams.perPage);

  useEffect(() => {
    dispatch(fetchReleaseList(releaseParams));
  }, [releaseParams]);

  useEffect(() => {
    search();
  }, [page, perPage]);

  const search = () => {
    dispatch(updateParams({ page, perPage }));
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ my: 6, mx: { xs: 2, md: 10 } }}>
        <UserReleaseFilter />
        {loading ? (
          <Box sx={{ px: 5, py: 2 }}>
            <Skeleton variant="rectangular" height="100vh" />
          </Box>
        ) : (
          <>
            <Grid container rowSpacing={3} columnSpacing={4}>
              {releaseList.data &&
                releaseList.data.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Link href={`/releases/detail/${item.id}`}>
                      <AnimationWrapper animationConfig="molasses">
                        <Card
                          className="release-card"
                          onClick={() => {
                            dispatch(markNotificationAsRead(item.id));
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              image={item.image}
                              alt="Internal Release"
                              className="release-preview-img"
                            />
                            <CardContent>
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 2,
                                  display: "flex",
                                  alignItems: "start",
                                  gap: 1,
                                }}
                              >
                                <CampaignIcon style={{ fontSize: 22 }} />
                                {item.name}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mb: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <PersonIcon style={{ fontSize: 22 }} />
                                  {item.department}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mb: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <CalendarMonthIcon style={{ fontSize: 22 }} />
                                  {readableFormatDate(item.created_at)}
                                </Typography>
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </AnimationWrapper>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        <Pagination
          count={
            releaseList.meta ? Math.ceil(releaseList.meta.total / perPage) : 0
          }
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          color="primary"
          sx={{ mt: 5, display: "flex", justifyContent: "center" }}
        />
      </Box>
    </div>
  );
};

export default UserRelease;
