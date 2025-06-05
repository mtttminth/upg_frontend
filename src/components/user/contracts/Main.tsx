'use client';
import { useResponsive } from "@/utils/common";
import { Box, Grid, Pagination } from "@mui/material";
import ContractCategoryFilter from "./CategoryFilter";
import UserContractFilter from "./Filter";
import UserContractList from "./List";

const UserContractMainComponent = () => {
  const isSmallScreen = useResponsive();
  return (
    <Grid container spacing={3}>
      {
        !isSmallScreen &&
          <Grid item xs={12} md={3}>
            <Box sx={{ backgroundColor: '#EFEFEF', }}>
              <ContractCategoryFilter />
            </Box>
          </Grid>
      }
      <Grid item xs={12} md={9}>
        <UserContractFilter />
        <UserContractList />
      </Grid>
    </Grid>
  )
}

export default UserContractMainComponent;