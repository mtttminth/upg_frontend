import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Button, Checkbox, FormControl, FormHelperText, Grid, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from 'react';
import { fetchAllGroupList } from '@/store/thunks/admin/groupThunk';
import { GroupAll } from '@/types/group';
import { filterGroup, updateSelectedGroups } from '@/store/slices/admin/groupSlice';
import { LoadingButton } from '@mui/lab';

type ChooseGroupParams = {
  setStep: Function;
}

const ChooseGroup: React.FC<ChooseGroupParams> = ({setStep}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {filteredAllGroupList, selectedGroupsDraft} = useSelector((state: RootState) => state.group);
  const [error, setError] = useState<boolean>(false);
  const [checked, setChecked] = useState<GroupAll[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllGroupList())
  }, [])

  useEffect(() => {
    (selectedGroupsDraft.length != 0) && setChecked(selectedGroupsDraft);
  }, [selectedGroupsDraft])

  const ChooseGroup = () => {
    if(checked.length == 0) {
      setError(true);
    } else {
      dispatch(updateSelectedGroups(checked));
      setStep(1);
    }
  }

  const checkByGroup = (event: React.ChangeEvent<HTMLInputElement>, group_id: number) => {
    const isChecked = event.target.checked;
    if(isChecked) {
      const tmp_group_checked = filteredAllGroupList.filter(group => group.id == group_id);
      setChecked([...checked, ...tmp_group_checked])
    } else {
      const tmp_group_checked = checked.filter(group => group.id != group_id);
      setChecked(tmp_group_checked);
    }
  };

  const search = () => {
    dispatch(filterGroup(keyword));
  }

  return (
    <>
      <Box>
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'end', }}>
          <Grid item xs={12} md={3}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Group Name </p>
              <TextField
                value={keyword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setKeyword(event.target.value);
                }}
                name="name"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{marginBottom: 0.3}}>
              <LoadingButton
                sx={{textTransform: 'none'}}
                onClick={search}
                variant="contained"
                color="info"
              >
                Search
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TableContainer sx={{mt: 2}} className='selectTable'>
        {
          error && <FormHelperText error> At least one group needs to be selected </FormHelperText>
        }
        <Box sx={{ margin: 1 }} className='subSelectTable'>
          <Table size="small" aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllGroupList.map((group) => (
                <TableRow key={group.id}>
                  <TableCell component="th" scope="row">
                    {group.name}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox 
                      checked={checked.find(check => check.id == group.id) ? true : false}
                      onChange={(event) => checkByGroup(event, group.id)} 
                      size='small'
                      color="secondary"
                    />                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Button sx={{textTransform: 'none'}} onClick={ChooseGroup} variant="contained" color="info">
            Choose
          </Button>
        </Box>
      </TableContainer>
    </>
  );
}

export default ChooseGroup;