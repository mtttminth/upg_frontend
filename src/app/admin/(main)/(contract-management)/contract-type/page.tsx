'use client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, LinearProgress, TablePagination, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExportToolbar from '@/components/admin/ExportToolbar';
import DateRangePicker from '@/components/admin/DateRangePicker';
import SearchBar from '@/components/admin/SearchBar';
import { Can } from '../../layout';
import { Permission, rowsPerPageOptions } from '@/consts/common';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { Dayjs } from 'dayjs';
import { readableFormatDate } from '@/utils/common';
import CommonSnackbar from '@/components/Snackbar';
import CommonConfirmDialog from '@/components/ConfirmDialog';
import { resetMessage, updateContractTypeParams } from '@/store/slices/admin/contract';
import { fetchContractTypeList, fetchDeleteContractType } from '@/store/thunks/admin/contractThunk';

const ContractType = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {loading, contractTypeParams, contractTypeList, success, contractMessage, contractErrors} = useSelector((state: RootState) => state.contract);
  const [page, setPage] = useState<number>(contractTypeParams.page);
  const [perPage, setPerPage] = useState<number>(contractTypeParams.perPage);
  const [keyword, setKeyword] = useState<string>(contractTypeParams.keyword);
  const [fromDate, setFromDate] = useState<Dayjs | null>(contractTypeParams.fromDate);
  const [toDate, setToDate] = useState<Dayjs | null>(contractTypeParams.toDate);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchContractTypeList(contractTypeParams));
  }, [contractTypeParams])

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
      setMessage(contractMessage);
    }
  }, [success])

  useEffect(() => {
    if(contractErrors) {
      setIsSuccess(false);
      setMessage(contractErrors.message);
    }
  }, [contractErrors])

  const search = () => {
    dispatch(updateContractTypeParams({page, perPage, keyword, fromDate, toDate}));
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

  const createContractType = () => {
    dispatch(resetMessage());
    router.push('/admin/contract-type/create');
  }

  const editContractType = (id: number) => {
    dispatch(resetMessage());
    router.push(`/admin/contract-type/edit/${id}`);
  }

  const deleteContractType = (id: number) => {
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
    dispatch(fetchDeleteContractType(currentId));
    handleCloseDialog();
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Type Name', minWidth: 200 },
    { field: 'created_at', headerName: 'Created Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'created_by', headerName: 'Created By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'updated_at', headerName: 'Updated Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'updated_by', headerName: 'Updated By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'action', headerName: '', minWidth: 200, flex: 1, sortable: false, align: 'right',
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Can I={Permission.CONTRACT_CREATE} a="admin">
              <Button onClick={() => editContractType(params.id as number)} size="small" color="secondary" startIcon={<EditOutlinedIcon />} disableRipple>
                Edit
              </Button>
            </Can>
            <Can I={Permission.CONTRACT_DELETE} a="admin">
              <Button onClick={() => deleteContractType(params.id as number)} size="small" color="secondary" startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
                Delete
              </Button>
            </Can>
          </Box>
        )
      },
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6"> Type List </Typography>
        <Can I={Permission.CONTRACT_CREATE} a="admin">
          <Button onClick={createContractType} variant="contained" color="info" sx={{ textTranscontract: "none" }}>
            Add New
          </Button>
        </Can>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
        <DateRangePicker fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
        <Button type="button" onClick={search} variant="contained" color="secondary" sx={{ textTranscontract: "none" }}>
          Search
        </Button>
      </Box>
      <DataGrid
        rows={contractTypeList.data ?? []}
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
        pageSizeOptions={[5, 10, 20]}
        disableColumnMenu
        hideFooter
      />
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={(contractTypeList.data && contractTypeList.meta.total) || 0} // total Element
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

export default ContractType;