'use client';
import { AppDispatch, RootState } from "@/store/store";
import { fetchDashboardOverview } from "@/store/thunks/user/homeThunk";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboardComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, dashboardOverview, success, homeMessage, homeErrors} = useSelector((state: RootState) => state.userHome);

  useEffect(() => {
    dispatch(fetchDashboardOverview());
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ mt: 6, mx: {xs: 2, md: 10}, py: 4}} className="dashboard-container">
      <Typography variant="h5" textAlign={'center'} mb={8} color={'white'}>Dashboard Viewer</Typography>
        <Grid container rowSpacing={3} columnSpacing={4}>
          <Grid item xs={6} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Image
              src="/images/icons/overall.png"
              width="100"
              height="0"
              alt="Resource"
            />
            <Typography variant="h4">{dashboardOverview ? dashboardOverview.overall: 0}</Typography>
            <Divider  className="overview-divider"/>
            <Typography variant="body2">Overall</Typography>
          </Grid>
          <Grid item xs={6} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Image
              src="/images/icons/hrDocument.png"
              width="100"
              height="0"
              alt="Resource"
            />
            <Typography variant="h4">{dashboardOverview ? dashboardOverview.hr_document: 0}</Typography>
            <Divider  className="overview-divider"/>
            <Typography variant="body2">HR Document</Typography>
          </Grid>
          <Grid item xs={6} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Image
              src="/images/icons/ISODocument.png"
              width="100"
              height="0"
              alt="Resource"
            />
            <Typography variant="h4">{dashboardOverview ? dashboardOverview.iso_document: 0}</Typography>
            <Divider  className="overview-divider"/>
            <Typography variant="body2">ISO Document</Typography>
          </Grid>
          <Grid item xs={6} md={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Image
              src="/images/icons/nonISODocument.png"
              width="100"
              height="0"
              alt="Resource"
            />
            <Typography variant="h4">{dashboardOverview ? dashboardOverview["non-iso_document"]: 0}</Typography>
            <Divider  className="overview-divider"/>
            <Typography variant="body2">Non ISO Document</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default UserDashboardComponent;