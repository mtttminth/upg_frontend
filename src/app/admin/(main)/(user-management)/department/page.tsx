'use client';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, LinearProgress, TablePagination, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExportToolbar from '@/components/admin/ExportToolbar';
import SearchBar from '@/components/admin/SearchBar';
import DateRangePicker from '@/components/admin/DateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { resetMessage, updateParams } from '@/store/slices/admin/departmentSlice';
import { Dayjs } from 'dayjs';
import { Can } from '../../layout';
import { fetchDeleteDepartment, fetchDepartmentList } from '@/store/thunks/admin/departmentThunk';
import CommonSnackbar from '@/components/Snackbar';
import { useRouter } from 'next/navigation';
import CommonConfirmDialog from '@/components/ConfirmDialog';
import { Permission, rowsPerPageOptions } from '@/consts/common';
import { readableFormatDate } from '@/utils/common';

const Department = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, departmentParams, departmentList, success, departmentMessage, departmentErrors} = useSelector((state: RootState) => state.department);
  const [page, setPage] = useState<number>(departmentParams.page);
  const [perPage, setPerPage] = useState<number>(departmentParams.perPage);
  const [keyword, setKeyword] = useState<string>(departmentParams.keyword);
  const [fromDate, setFromDate] = useState<Dayjs | null>(departmentParams.fromDate);
  const [toDate, setToDate] = useState<Dayjs | null>(departmentParams.toDate);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDepartmentList(departmentParams));
  }, [departmentParams])

  useEffect(() => {
    search();
  }, [page, perPage])

  useEffect(() => {
    message && 
      SetSnackbarOpen(true); 
      search();
  }, [message]);

  useEffect(() => {
    if(success) {
      setIsSuccess(true);
      setMessage(departmentMessage);
    }
  }, [success])

  useEffect(() => {
    if(departmentErrors) {
      setIsSuccess(false);
      setMessage(departmentErrors.message);
    }
  }, [departmentErrors])

  const search = () => {
    dispatch(updateParams({page, perPage, keyword, fromDate, toDate}));
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSnackBarClose = () => {
    SetSnackbarOpen(false);
    setTimeout(() => {
      dispatch(resetMessage());
      setIsSuccess(false);
      setMessage('');
    }, 500);
  };

  const createDepartment = () => {
    dispatch(resetMessage());
    router.push('/admin/department/create');
  }

  const editDepartment = (id: number) => {
    dispatch(resetMessage());
    router.push(`/admin/department/edit/${id}`);
  }

  const deleteDepartment = (id: number) => {
    setCurrentId(id);
    handleClickOpenDialog();
  }

  const handleClickOpenDialog = () => {
    setConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setConfirmDialog(false);
  };

  const handleConfirm = () => {
    dispatch(fetchDeleteDepartment(currentId));
    handleCloseDialog();
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 200 },
    { field: 'created_at', headerName: 'Created Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'created_by', headerName: 'Created By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'updated_at', headerName: 'Updated Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'updated_by', headerName: 'Updated By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'action', headerName: '', minWidth: 200, flex: 1, sortable: false, align: 'right',
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Can I={Permission.DEPARTMENT_EDIT} a="admin">
              <Button onClick={() => editDepartment(params.id as number)} size="small" color="secondary" startIcon={<EditOutlinedIcon />} disableRipple>
                Edit
              </Button>
            </Can>
            <Can I={Permission.DEPARTMENT_DELETE} a="admin">
              <Button onClick={() => deleteDepartment(params.id as number)} size="small" color="secondary" startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
                Delete
              </Button>
            </Can>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Department List</Typography>
        <Can I={Permission.DEPARTMENT_CREATE} a="admin">
          <Button onClick={createDepartment} variant="contained" color="info" sx={{ textTransform: "none" }}>
            Add New
          </Button>
        </Can>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", mb: 2, gap: 2, flexWrap: "wrap" }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
        <DateRangePicker fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
        <Button type="button" onClick={search} variant="contained" color="secondary" sx={{ textTransform: "none" }}>
          Search
        </Button>
      </Box>
      <DataGrid
        rows={departmentList.data ?? []}
        columns={columns}
        slots={{
          loadingOverlay: LinearProgress,
          toolbar: ExportToolbar,
        }}
        loading={loading}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        disableColumnMenu
        hideFooter
      />
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={(departmentList.data && departmentList.meta.total) || 0} // total Element
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CommonSnackbar 
        success={isSuccess}
        message={message}
        snackbarOpen={snackbarOpen} 
        handleSnackBarClose={handleSnackBarClose}
      />
      <CommonConfirmDialog 
        open={confirmDialog}
        title={'Confirmation'}
        message={'Are you sure you want to delete?'}
        handleClose={handleCloseDialog}
        handleClickOpen={handleClickOpenDialog}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default Department;
