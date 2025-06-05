import { updateParams } from "@/store/slices/user/releaseSlice";
import { AppDispatch, RootState } from "@/store/store";
import { fetchDepartmentList, fetchReleaseCreatedBys } from "@/store/thunks/user/releaseThunk";
import { Box, Button, Checkbox, FormControl, Grid, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
const UserReleaseFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {releaseParams, releaseCreatedBys} = useSelector((state: RootState) => state.userRelease);
  const [keyword, setKeyword] = useState<string>(releaseParams.keyword);
  const [created_by_ids, setCreatedByIds] = useState<number[]>(releaseParams.created_by_ids);

  useEffect(() => {
    dispatch(fetchReleaseCreatedBys());
  }, [])
  const search = () => {
    dispatch(updateParams({keyword, created_by_ids}));
  }
  const handleDepartmentChange = (event: SelectChangeEvent<typeof created_by_ids>) => {
    const {target: { value }} = event;
    setCreatedByIds(typeof value === 'string' ? value.split(',').map(numStr => parseInt(numStr.trim(), 10)) : value);
  };
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
            value={created_by_ids.map(department => department)}
            onChange={handleDepartmentChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => {
              const selectedNames = selected.map(id => releaseCreatedBys.find(createdBy => createdBy.id === id)?.name);
              return selectedNames.join(', ');
            }}
            MenuProps={MenuProps}
          >
            {releaseCreatedBys.map((createdBy) => (
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
      <Grid item xs={12} md={'auto'} sx={{ display: 'flex', justifyContent: 'end', mb: 0.3, }}>
        <Button onClick={search} variant="contained" color="secondary" sx={{ textTranscontract: "none" }}>
          Search
        </Button>
      </Grid>
    </Grid>
  )
}

export default UserReleaseFilter;