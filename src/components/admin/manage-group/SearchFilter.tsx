import { updateGroupParams } from "@/store/slices/admin/groupSlice";
import { AppDispatch, RootState } from "@/store/store";
import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControl, Grid, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
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
const DeparmentSearchFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {departmentList} = useSelector((state: RootState) => state.auth);
  const {loading, departmentFilterParam} = useSelector((state: RootState) => state.group);
  const [departments, setDepartments] = useState<number[]>(departmentFilterParam.departments);
  const [fromRank, setFromRank] = useState<string>(departmentFilterParam.fromRank);
  const [toRank, setToRank] = useState<string>(departmentFilterParam.toRank);

  const handleChange = (event: SelectChangeEvent<typeof departments>) => {
    const {target: { value }} = event;
    setDepartments(typeof value === 'string' ? value.split(',').map(numStr => parseInt(numStr.trim(), 10)) : value);
  };

  const search = () => {
    dispatch(updateGroupParams({fromRank, toRank, departments}));
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'end', }}>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth>
            <p className="mb-1"> From Rank </p>
            <TextField
              value={fromRank}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFromRank(event.target.value);
              }}
              name="name"
              size="small"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth>
            <p className="mb-1"> To Rank </p>
            <TextField
              value={toRank}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setToRank(event.target.value);
              }}
              name="name"
              size="small"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth className="multi-select">
            <p className="mb-1"> Department</p>
            <Select
              name="department"
              size="small"
              variant="outlined"
              multiple
              value={departments.map(department => department)}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => {
                const selectedNames = selected.map(id => departmentList.find(department => department.id === id)?.name);
                return selectedNames.join(', ');
              }}
              MenuProps={MenuProps}
            >
              {departmentList.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  <Checkbox checked={departments.some(dep => dep == department.id)} />
                  <ListItemText primary={department.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{marginBottom: 0.3}}>
            <LoadingButton
              sx={{textTransform: 'none'}}
              onClick={search}
              loading={loading}
              variant="contained"
              color="info"
            >
              Search
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeparmentSearchFilter;