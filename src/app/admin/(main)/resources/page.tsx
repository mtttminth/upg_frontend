'use client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, LinearProgress, TablePagination, Typography } from '@mui/material';
import NextLink from 'next/link';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExportToolbar from '@/components/admin/ExportToolbar';
import DateRangePicker from '@/components/admin/DateRangePicker';
import SearchBar from '@/components/admin/SearchBar';
import { readableFormatDate } from '@/utils/common';
import { fetchDeletePage, fetchPageList } from '@/store/thunks/admin/resourcesThunk';
import { resetMessage, updatePageParams } from '@/store/slices/admin/resourcesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dayjs } from 'dayjs';
import { Can } from '../layout';
import { Permission, rowsPerPageOptions } from '@/consts/common';
import CommonSnackbar from '@/components/Snackbar';
import CommonConfirmDialog from '@/components/ConfirmDialog';
import { resetGroupParams } from '@/store/slices/admin/groupSlice';

const Page = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {loading, pageParams, pageList, success, pageMessage} = useSelector((state: RootState) => state.page);
  const [page, setPage] = useState<number>(pageParams.page);
  const [perPage, setPerPage] = useState<number>(pageParams.perPage);
  const [keyword, setKeyword] = useState<string>(pageParams.keyword);
  const [fromDate, setFromDate] = useState<Dayjs | null>(pageParams.fromDate);
  const [toDate, setToDate] = useState<Dayjs | null>(pageParams.toDate);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const router = useRouter();

  useEffect(() => {
    dispatch(resetGroupParams())
  }, []);

  useEffect(() => {
    dispatch(fetchPageList(pageParams));
  }, [pageParams])

  useEffect(() => {
    search();
  }, [page, perPage])

  useEffect(() => {
    pageMessage && 
      SetSnackbarOpen(true); 
      search();
  }, [pageMessage]);

  const search = () => {
    dispatch(updatePageParams({page, perPage, keyword, fromDate, toDate}));
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

  const createPage = () => {
    dispatch(resetMessage());
    router.push('/admin/resources/create');
  }

  const editPage = (id: number) => {
    dispatch(resetMessage());
    router.push(`/admin/resources/edit/${id}`);
  }

  const deletePage = (id: number) => {
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
    dispatch(fetchDeletePage(currentId));
    handleCloseDialog();
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 180 },
    { field: 'subcategory', headerName: 'SubCategory', minWidth: 180 },
    { field: 'created_at', headerName: 'Created Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'created_by', headerName: 'Created By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'updated_at', headerName: 'Updated Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'updated_by', headerName: 'Updated By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'action', headerName: '', minWidth: 200, flex: 1, sortable: false, align: 'right',
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Can I={Permission.PAGE_EDIT} a="admin">
              <Button onClick={() => editPage(params.id as number)} size="small" color="secondary" startIcon={<EditOutlinedIcon />} disableRipple>
                Edit
              </Button>
            </Can>
            <Can I={Permission.PAGE_DELETE} a="admin">
              <Button onClick={() => deletePage(params.id as number)} size="small" color="secondary" startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
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
        <Typography variant="h6"> Resource List </Typography>
        <Can I={Permission.PAGE_CREATE} a="admin">
          <Button onClick={createPage} variant="contained" color="info" sx={{ textTransform: "none" }}>
            Add New
          </Button>
        </Can>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
        <DateRangePicker fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
        <Button type="button" onClick={search} variant="contained" color="secondary" sx={{ textTransform: "none" }}>
          Search
        </Button>
      </Box>
      <DataGrid
        rows={pageList.data ?? []}
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
        count={(pageList.data && pageList.meta.total) || 0} // total Element
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CommonSnackbar 
        success={success}
        message={pageMessage}
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

export default Page;