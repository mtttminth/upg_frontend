'use client';
import { useResponsive } from "@/utils/common";
import { Box, Grid, Pagination } from "@mui/material";
import FormCategoryFilter from "./CategoryFilter";
import UserFormFilter from "./Filter";
import UserFormList from "./List";

const UserFormMainComponent = () => {
  const isSmallScreen = useResponsive();
  return (
    <Grid container spacing={3}>
      {
        !isSmallScreen &&
          <Grid item xs={12} md={3}>
            <Box sx={{ backgroundColor: '#EFEFEF', }}>
              <FormCategoryFilter />
            </Box>
          </Grid>
      }
      <Grid item xs={12} md={9}>
        <UserFormFilter />
        <UserFormList />
      </Grid>
    </Grid>
  )
}

export default UserFormMainComponent;