"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchRelease } from "@/store/thunks/user/homeThunk";
import { readableFormatDate } from "@/utils/common";
import { AnimationWrapper } from "react-hover-animation";
import { markNotificationAsRead } from "@/store/slices/user/authSlice";

const UserReleaseComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, releaseList, success, homeMessage, homeErrors } =
    useSelector((state: RootState) => state.userHome);

  useEffect(() => {
    dispatch(fetchRelease());
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ mt: 6, mx: { xs: 2, md: 10 } }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" className="content-title">
            Internal Releases
          </Typography>
          <Link href={"/releases"} className="view-all">
            <p>View All</p>
            <ArrowCircleRightIcon style={{ fontSize: 25 }} />
          </Link>
        </Box>
        <Grid container rowSpacing={3} columnSpacing={4}>
          {loading ? (
            <Box sx={{ px: 5, py: 2 }}>
              <Skeleton variant="rectangular" height="100vh" />
            </Box>
          ) : (
            releaseList.map((item, index) => (
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
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default UserReleaseComponent;
