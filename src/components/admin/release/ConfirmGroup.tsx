import { Box, Button, LinearProgress } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { deleteGroup, deleteMember } from '@/store/slices/admin/groupSlice';

const ConfirmGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {selectedGroupsDraft} = useSelector((state: RootState) => state.group);

  const removeMember = (id: number) => {
    dispatch(deleteGroup(id));
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 100 },
    { field: 'name', headerName: 'Name', minWidth: 200 },
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
        rows={selectedGroupsDraft ?? []}
        columns={columns}
        slots={{
          loadingOverlay: LinearProgress,
        }}
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

export default ConfirmGroup;