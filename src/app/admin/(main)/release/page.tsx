"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip, LinearProgress, TablePagination, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExportToolbar from "@/components/admin/ExportToolbar";
import SearchBar from "@/components/admin/SearchBar";
import DateRangePicker from "@/components/admin/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { fetchReleaseList, fetchDeleteRelease } from "@/store/thunks/admin/releaseThunk";
import { resetMessage, updateParams } from "@/store/slices/admin/releaseSlice";
import { Can } from "../layout";
import { Permission, rowsPerPageOptions } from "@/consts/common";
import CommonSnackbar from "@/components/Snackbar";
import CommonConfirmDialog from "@/components/ConfirmDialog";
import { readableFormatDate } from "@/utils/common";
import { resetGroupParams } from "@/store/slices/admin/groupSlice";

const Release = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, releaseParams, releaseList, success, releaseMessage} = useSelector((state: RootState) => state.release);
  const [page, setPage] = useState<number>(releaseParams.page);
  const [perPage, setPerPage] = useState<number>(releaseParams.perPage);
  const [keyword, setKeyword] = useState<string>(releaseParams.keyword);
  const [fromDate, setFromDate] = useState<Dayjs | null>(releaseParams.fromDate);
  const [toDate, setToDate] = useState<Dayjs | null>(releaseParams.toDate);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const router = useRouter();

  useEffect(() => {
    dispatch(resetGroupParams());
  }, []);

  useEffect(() => {
    dispatch(fetchReleaseList(releaseParams));
  }, [releaseParams])

  useEffect(() => {
    search();
  }, [page, perPage])

  useEffect(() => {
    releaseMessage && 
      SetSnackbarOpen(true);
      search();
  }, [releaseMessage]);

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
    }, 500);
  };

  const createDepartment = () => {
    dispatch(resetMessage());
    router.push('/admin/release/create');
  }

  const editRelease = (id: number) => {
    dispatch(resetMessage());
    router.push(`/admin/release/edit/${id}`);
  }

  const deleteRelease = (id: number) => {
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
    dispatch(fetchDeleteRelease(currentId));
    handleCloseDialog();
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100 },
    { field: "name", headerName: "Name", minWidth: 200 },
    {
      field: "releaseStatus",
      headerName: "Status",
      minWidth: 120,
      renderCell: (params) => {
        switch (params.row.releaseStatus) {
          case 'Important':
            return <Chip label="Important" color="error" size="small" />;
          case 'Normal':
            return <Chip label="Normal" color="success" size="small" />;
          case 'Warning':
            return <Chip label="Warning" color="warning" size="small" />;
        }
      },
    },
    { field: 'created_at', headerName: 'Created Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'created_by', headerName: 'Created By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    { field: 'updated_at', headerName: 'Updated Date', minWidth: 200, valueGetter: (params) => params.value ? readableFormatDate(params.value) : '—',},
    { field: 'updated_by', headerName: 'Updated By', minWidth: 120, valueGetter: (params) => params.value || '—',},
    {
      field: "action",
      headerName: "",
      minWidth: 200,
      flex: 1,
      sortable: false,
      align: "right",
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Can I={Permission.ANNOUNCEMENT_EDIT} a="admin">
              <Button onClick={() => editRelease(params.id as number)} size="small" color="secondary" startIcon={<EditOutlinedIcon />} disableRipple>
                Edit
              </Button>
            </Can>
            <Can I={Permission.ANNOUNCEMENT_DELETE} a="admin">
              <Button onClick={() => deleteRelease(params.id as number)} size="small" color="secondary" startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
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
        <Typography variant="h6"> Release List </Typography>
        <Can I={Permission.ANNOUNCEMENT_CREATE} a="admin">
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
        rows={releaseList.data ?? []}
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
        count={(releaseList.data && releaseList.meta.total) || 0} // total Element
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CommonSnackbar 
        success={success}
        message={releaseMessage}
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

export default Release;
