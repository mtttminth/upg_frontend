'use client';
import UserCategoryFilter from "@/components/user/resources/CategoryFilter";
import UserResourceFilter from "@/components/user/resources/Filter";
import UserResourceList from "@/components/user/resources/List";
import { useResponsive } from "@/utils/common";
import { Box, Grid, Pagination } from "@mui/material";

const UserResourceMainComponent = () => {
  const isSmallScreen = useResponsive();
  return (
    <Grid container spacing={3}>
      {
        !isSmallScreen &&
          <Grid item xs={12} md={3}>
            <Box>
              <UserCategoryFilter />
            </Box>
          </Grid>
      }
      <Grid item xs={12} md={9}>
        <UserResourceFilter />
        <UserResourceList />
      </Grid>
    </Grid>
  )
}

export default UserResourceMainComponent;