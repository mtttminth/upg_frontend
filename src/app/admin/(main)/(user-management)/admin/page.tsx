'use client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, LinearProgress, TablePagination, Typography } from '@mui/material';
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
import { fetchAdminList, fetchDeleteAdmin } from '@/store/thunks/admin/adminThunk';
import { resetMessage, updateParams } from '@/store/slices/admin/adminSlice';
import { Permission, rowsPerPageOptions } from '@/consts/common';
import CommonSnackbar from '@/components/Snackbar';
import CommonConfirmDialog from '@/components/ConfirmDialog';
import { readableFormatDate } from '@/utils/common';
import { Can } from '../../layout';

const ManageAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, adminParams, adminList, success, adminMessage, adminErrors} = useSelector((state: RootState) => state.admin);
  const [page, setPage] = useState<number>(adminParams.page);
  const [perPage, setPerPage] = useState<number>(adminParams.perPage);
  const [keyword, setKeyword] = useState<string>(adminParams.keyword);
  const [fromDate, setFromDate] = useState<Dayjs | null>(adminParams.fromDate);
  const [toDate, setToDate] = useState<Dayjs | null>(adminParams.toDate);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAdminList(adminParams));
  }, [adminParams])

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
      setMessage(adminMessage);
    }
  }, [success])

  useEffect(() => {
    if(adminErrors) {
      setIsSuccess(false);
      setMessage(adminErrors.message);
    }
  }, [adminErrors])

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

  const createAdmin = () => {
    dispatch(resetMessage());
    router.push('/admin/admin/create');
  }

  const editAdmin = (id: number) => {
    dispatch(resetMessage());
    router.push(`/admin/admin/edit/${id}`);
  }

  const deleteAdmin = (id: number) => {
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
    dispatch(fetchDeleteAdmin(currentId));
    handleCloseDialog();
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 120 },
    { field: 'code', headerName: 'Code', minWidth: 120 },
    { field: 'department', headerName: 'Department', minWidth: 120, valueGetter: (params) => params.value.name},
    { field: 'created_at', headerName: 'Created Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'created_by', headerName: 'Created By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'updated_at', headerName: 'Updated Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'updated_by', headerName: 'Updated By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'action', headerName: '', minWidth: 200, flex: 1, sortable: false, align: 'right',
      renderCell: (params) => {
        if(params.row.name != 'Super Admin')
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Can I={Permission.ADMIN_EDIT} a="admin">
                <Button onClick={() => editAdmin(params.id as number)} size="small" color="secondary" startIcon={<EditOutlinedIcon />} disableRipple>
                  Edit
                </Button>
              </Can>
              <Can I={Permission.ADMIN_DELETE} a="admin">
                <Button onClick={() => deleteAdmin(params.id as number)} size="small" color="secondary" startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
                  Delete
                </Button>
              </Can>
            </Box>
        );
      },
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6"> Admin List </Typography>
        <Can I={Permission.ADMIN_CREATE} a="admin">
          <Button onClick={createAdmin} variant="contained" color="info" sx={{ textTransform: "none" }}>
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
        rows={adminList.data ?? []}
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
        count={(adminList.data && adminList.meta.total) || 0} // total Element
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
}

export default ManageAdmin;