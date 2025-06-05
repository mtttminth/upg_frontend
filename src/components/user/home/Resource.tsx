"use client";
import { Box, Button, Grid, Typography, Skeleton } from "@mui/material";
import Link from "next/link";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";
import { fetchResources } from "@/store/thunks/user/homeThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const numbers = [1, 2, 3, 4, 5];

const UserResourceComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, resourceList, success, homeMessage, homeErrors } =
    useSelector((state: RootState) => state.userHome);
  const detailResource = (id: number) => {
    router.push(`/resources/${id}`);
  };
  useEffect(() => {
    dispatch(fetchResources());
  }, []);
  const router = useRouter();
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
            Resources
          </Typography>
          <Link href={"/resources"} className="view-all">
            <p>View All</p>
            <ArrowCircleRightIcon style={{ fontSize: 25 }} />
          </Link>
        </Box>
        <Grid container rowSpacing={3}>
          {loading ? (
            <Box sx={{ px: 5, py: 2 }}>
              <Skeleton variant="rectangular" height="100vh" />
            </Box>
          ) : (
            resourceList.map((item, index) => (
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="resource-container"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src="/images/resources.png"
                      width="60"
                      height="0"
                      alt="Resource"
                      className="resource-icon"
                    />
                    <Typography variant="body2" sx={{ ml: 5 }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => detailResource(item.id)}
                    size="small"
                    color="secondary"
                    variant="contained"
                    disableRipple
                    className="resource-detail-button"
                  >
                    View Detail
                  </Button>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default UserResourceComponent;
