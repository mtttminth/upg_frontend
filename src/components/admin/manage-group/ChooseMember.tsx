import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Checkbox, FormHelperText, TableHead } from '@mui/material';
import { CheckedState, Department, OpenState, User } from "@/types/group";
import { useResponsive } from "@/utils/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchDepartmentUsers } from "@/store/thunks/admin/groupThunk";
import { resetBindedState, updateSelectedUsers } from "@/store/slices/admin/groupSlice";

type ChooseMemberParams = {
  setStep: Function;
}

const ChooseMember: React.FC<ChooseMemberParams> = ({setStep}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {departmentFilterParam, departmentUsers, selectedDepartmentUsers, selectedDepartmentUsersDraft, selededUsersBinded} = useSelector((state: RootState) => state.group);
  const isSmallScreen = useResponsive();
  const [open, setOpen] = React.useState<OpenState>([]);
  const [checked, setChecked] = React.useState<CheckedState>([]);
  const [departmentList, setDepartmentList] = React.useState<Department[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getMemberList();
  }, [])

  useEffect(() => {
    getMemberList();
  }, [departmentFilterParam])

  useEffect(() => {
    (departmentUsers.length != 0) && 
      setDepartmentList(departmentUsers);
      (selectedDepartmentUsersDraft.length == 0 && checked.length == 0) &&
        setInitialCheckList();
  }, [departmentUsers])

  useEffect(() => {
    (selectedDepartmentUsersDraft.length != 0) && setChecked(selectedDepartmentUsersDraft);
  }, [selectedDepartmentUsersDraft])

  const getMemberList = () => {
    dispatch(fetchDepartmentUsers(departmentFilterParam))
  }

  const setInitialCheckList = () => {
    const department_check_list: CheckedState = [];
    departmentList.map((department) => {
      department_check_list[department.id] = {
        name: department.name,
        users: [],
      };
    })
    setChecked(department_check_list);
  }

  const toggleOpen = (id: number) => {
    setOpen(prevState => ({
      ...prevState, [id]: !prevState[id]
    }));
  };

  const checkByDepartment = (event: React.ChangeEvent<HTMLInputElement>, department_id: number) => {
    const isChecked = event.target.checked;
    const tmp_user_checked: User[] = [];
    let checkedDepartmentName = '';
    const checkedDepartment = departmentList.find(d => d.id == department_id);
    checkedDepartment?.users.map((user) => {
      tmp_user_checked.push(user)
    })
    checkedDepartmentName = checkedDepartment?.name || '';
    let updatedChecked = [];
    const currentDepartment = checked.find(department => department && (department.name === checkedDepartmentName));
    if(!currentDepartment) {
      updatedChecked = [...checked];
      updatedChecked[department_id] = {name: checkedDepartmentName ?? '', users: isChecked ? tmp_user_checked : []};
    } else {
      updatedChecked = checked.map(department => {
        if(department && (department.name === checkedDepartmentName)) {
          return {
            ...department,
            users: isChecked ? tmp_user_checked : [],
          }
        } else {
          return department
        };
      })
    }
    
    setChecked(updatedChecked);
  };

  const checkByMember = (event: React.ChangeEvent<HTMLInputElement>, department_id: number, user_id: number) => {
    const tmp_department = departmentList.find(department => department.id === department_id);
    let checkedDepartmentName = tmp_department?.name;
    const tmp_user = tmp_department?.users.find(user => user.id === user_id);
    const isChecked = event.target.checked;
    const checked_department = checked[department_id];
    let tmp_user_checked: User[] = [];
    let updatedChecked = [];
    if(tmp_user && isChecked) tmp_user_checked.push(tmp_user)
    checked_department?.users.map((user) => {
      user.id !== user_id &&
      tmp_user_checked.push(user)
    })
    if(!checked_department && tmp_user) {
      updatedChecked = [...checked];
      updatedChecked[department_id] = {name: checkedDepartmentName ?? '', users: [tmp_user]};
    } else {
      updatedChecked = checked.map(department => {
        if(department && (department.name === checkedDepartmentName)) {
          return {
            ...department,
            users: tmp_user_checked,
          }
        } else {
          return department
        };
      })
    }    
    setChecked(updatedChecked);
  };

  const ChooseMember = () => {
    dispatch(updateSelectedUsers(checked));
  }

  useEffect(() => {
    if(selededUsersBinded) {
      if(selectedDepartmentUsers.length == 0) {
        setError(true);
      } else {        
        setStep(1);
      }
      dispatch(resetBindedState());
    } 
  }, [selededUsersBinded])

  return (
    <TableContainer sx={{mt: 2}} className='selectTable'>
      {
        error && <FormHelperText error> At least one member needs to be selected </FormHelperText>
      }
      <Table size="small" aria-label="collapsible table">
        <TableBody>
          {departmentList.map((department) => (
            <React.Fragment key={department.id}>
              <TableRow sx={{ backgroundColor: '#EFEFEF', '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{width: 50}}>
                  <IconButton onClick={() => toggleOpen(department.id)}>
                    {open[department.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell size="small" align="left" sx={{paddingX: 0}}>
                  {department.name}
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={(department.users.length == checked[department.id]?.users.length && department.users.length != 0) || false}
                    onChange={(event) => checkByDepartment(event, department.id)}
                    size='small'
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }} className='subSelectTable'>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ width: 50, display: isSmallScreen ? 'none' : '' }}></TableCell>
                            <TableCell sx={{paddingX: 0}}>Name</TableCell>
                            <TableCell>Staff Code</TableCell>
                            <TableCell>Rank</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {department.users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell sx={{ width: 50, display: isSmallScreen ? 'none' : '' }}></TableCell>
                              <TableCell sx={{paddingX: 0}} component="th" scope="row">
                                {user.name}
                              </TableCell>
                              <TableCell>{user.code}</TableCell>
                              <TableCell>{user.rank}</TableCell>
                              <TableCell align="right">
                                <Checkbox 
                                  checked={checked[department.id]?.users.find(item => item.id === user.id) ? true : false}
                                  onChange={(event) => checkByMember(event, department.id, user.id)} 
                                  size='small'
                                  color="secondary"
                                />                   
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Button sx={{textTransform: 'none'}} onClick={ChooseMember} variant="contained" color="info">
          Choose
        </Button>
      </Box>
    </TableContainer>
  );
}

export default ChooseMember;