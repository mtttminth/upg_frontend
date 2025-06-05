import { useResponsive } from "@/utils/common";
import { Box, Button, Drawer, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import UserCategoryFilter from "./CategoryFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateParams } from "@/store/slices/user/contractSlice";

const UserContractFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {contractParams} = useSelector((state: RootState) => state.userContract);
  const [keyword, setKeyword] = useState<string>(contractParams.keyword);
  const isSmallScreen = useResponsive();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const search = () => {
    dispatch(updateParams({keyword}));
  }
  return (
    <Grid container sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', mb: 4, gap: 2, flexWrap: 'wrap' }}>
      <Grid item xs={12} md={3} sx={{ textAlign: 'end'}}>
        <FormControl variant="standard" fullWidth>
          <TextField
            value={keyword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setKeyword(event.target.value);
            }}
            placeholder="Search with Name"
            variant="outlined"
            size="small"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={'auto'} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3, }}>
        {
          isSmallScreen && 
            <Button onClick={toggleDrawer(true)} variant="contained" color="secondary">
              <FilterListIcon />
            </Button>
        }
        <Button onClick={search} variant="contained" color="secondary" sx={{ textTranscontract: "none" }}>
          Search
        </Button>
      </Grid>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <UserCategoryFilter />
        </Box>
      </Drawer>
    </Grid>
  )
}

export default UserContractFilter;