'use client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TablePagination, Typography, LinearProgress } from '@mui/material';
import NextLink from 'next/link'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExportToolbar from '@/components/admin/ExportToolbar';
import DateRangePicker from '@/components/admin/DateRangePicker';
import SearchBar from '@/components/admin/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { fetchUserList, fetchDeleteUser } from '@/store/thunks/admin/userThunk';
import { resetMessage, updateParams } from '@/store/slices/admin/userSlice';
import { Permission, rowsPerPageOptions } from '@/consts/common';
import CommonSnackbar from '@/components/Snackbar';
import CommonConfirmDialog from '@/components/ConfirmDialog';
import { readableFormatDate } from '@/utils/common';
import { Can } from '../../layout';


const ManageUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, userParams, userList, success, userMessage} = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState<number>(userParams.page);
  const [perPage, setPerPage] = useState<number>(userParams.perPage);
  const [keyword, setKeyword] = useState<string>(userParams.keyword);
  const [fromDate, setFromDate] = useState<Dayjs | null>(userParams.fromDate);
  const [toDate, setToDate] = useState<Dayjs | null>(userParams.toDate);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    dispatch(fetchUserList(userParams));
  }, [userParams])

  useEffect(() => {
    search();
  }, [page, perPage])

  useEffect(() => {
    userMessage && 
      SetSnackbarOpen(true); 
      search();
  }, [userMessage]);

  const search = () => {
    dispatch(updateParams({page, perPage, keyword, fromDate, toDate}));
  }

  const handleSearch = () => {
    setPage(0)
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
    }, 500);
  };

  const createUser = () => {
    dispatch(resetMessage());
    router.push('/admin/user/create');
  }

  const editUser = (id: number) => {
    dispatch(resetMessage());
    router.push(`/admin/user/edit/${id}`);
  }

  const deleteUser = (id: number) => {
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
    dispatch(fetchDeleteUser(currentId));
    handleCloseDialog();
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 200 },
    { field: 'rank', headerName: 'Rank', minWidth: 200},
    { field: 'code', headerName: 'Staff Code', minWidth: 200},
    { field: 'department', headerName: 'Department', minWidth: 200 },
    { field: 'created_at', headerName: 'Creation Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—', },
    { field: 'created_by', headerName: 'Created By', minWidth: 200 },
    { field: 'updated_at', headerName: 'Updated Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—', },
    { field: 'updated_by', headerName: 'Updated By', minWidth: 200 },
    { field: 'action', headerName: '', minWidth: 200, flex: 1, sortable: false, align: 'right',
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Can I={Permission.USER_EDIT} a="admin">
              <Button onClick={() => editUser(params.id as number)} size="small" color="secondary" startIcon={<EditOutlinedIcon />} disableRipple>
                Edit
              </Button>
            </Can>
            <Can I={Permission.USER_DELETE} a="admin">
              <Button onClick={() => deleteUser(params.id as number)} size="small" color="secondary" startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
                Delete
              </Button>
            </Can>
          </Box>
        )
      }
    },
  ];
  

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6"> User List </Typography>
        <Can I={Permission.USER_CREATE} a="admin">
          <Button onClick={createUser} variant="contained" color="info" sx={{ textTransform: "none" }}>
              Add New
          </Button>
        </Can>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword}/>
        <DateRangePicker fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
        <Button onClick={handleSearch} variant="contained" color="secondary" sx={{ textTransform: "none" }}>Search</Button>
      </Box>
      <DataGrid
        rows={userList.data ?? []}
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
            }
          }
        }}
        disableColumnMenu
        hideFooter
        
      />
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={(userList.data && userList.meta.total) || 0} // total Element
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CommonSnackbar 
        success={success}
        message={userMessage}
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
}

export default ManageUser;