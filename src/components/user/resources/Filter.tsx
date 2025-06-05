import { useResponsive } from "@/utils/common";
import { Box, Button, Checkbox, Drawer, FormControl, Grid, IconButton, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import UserCategoryFilter from "./CategoryFilter";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchReleaseCreatedBys } from "@/store/thunks/user/releaseThunk";
import { updateParams } from "@/store/slices/user/resourceSlice";
import { fetchResourceCreatedBys } from "@/store/thunks/user/resourceThunk";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const UserResourceFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {resourceParams, resourceCreatedBys} = useSelector((state: RootState) => state.userResource);
  const [keyword, setKeyword] = useState<string>(resourceParams.keyword);
  const [created_by_ids, setCreatedByIds] = useState<number[]>(resourceParams.created_by_ids);
  const isSmallScreen = useResponsive();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchResourceCreatedBys());
  }, [])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const search = () => {
    dispatch(updateParams({keyword, created_by_ids}));
  }
  const handleDepartmentChange = (event: SelectChangeEvent<typeof created_by_ids>) => {
    const {target: { value }} = event;
    setCreatedByIds(typeof value === 'string' ? value.split(',').map(numStr => parseInt(numStr.trim(), 10)) : value);
  };
  const searchHandleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      search();
    }
  }
  return (
    <Grid container sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', mb: 4, gap: 2, flexWrap: 'wrap' }}>
      <Grid item xs={12} md={3} sx={{ textAlign: 'start'}}>
        <FormControl variant="standard" fullWidth className="multi-select">
          <p>Created by</p>
          <Select
            name="department"
            size="small"
            variant="outlined"
            multiple
            value={created_by_ids.map(createdBy => createdBy)}
            onChange={handleDepartmentChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => {
              const selectedNames = selected.map(id => resourceCreatedBys.find(createdBy => createdBy.id === id)?.name);
              return selectedNames.join(', ');
            }}
            MenuProps={MenuProps}
          >
            {resourceCreatedBys.map((createdBy) => (
              <MenuItem key={createdBy.id} value={createdBy.id}>
                <Checkbox checked={created_by_ids.some(dep => dep == createdBy.id)} />
                <ListItemText primary={createdBy.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3} sx={{ textAlign: 'end'}}>
        <FormControl variant="standard" fullWidth>
          <TextField
            onKeyDown={searchHandleKeyDown}
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

export default UserResourceFilter;