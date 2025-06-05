import { Box, Button, LinearProgress } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { deleteMember } from '@/store/slices/admin/groupSlice';

const ConfirmMember = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, selectedDepartmentUsers} = useSelector((state: RootState) => state.group);

  const removeMember = (id: number) => {
    dispatch(deleteMember(id));
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 200 },
    { field: 'code', headerName: 'Staff Code', minWidth: 200 },
    { field: 'rank', headerName: 'Rank', minWidth: 200 },
    { field: 'department', headerName: 'Department', minWidth: 200 },
    { field: 'action', headerName: '', minWidth: 200, flex: 1, sortable: false, align: 'right',
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button onClick={() => removeMember(params.id as number)} size="small" color='secondary' startIcon={<DeleteOutlineOutlinedIcon />} disableRipple>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={selectedDepartmentUsers ?? []}
        columns={columns}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableColumnMenu
      />
    </>
  );
}

export default ConfirmMember;