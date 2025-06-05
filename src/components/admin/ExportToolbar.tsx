import { Box } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

const ExportToolbar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    </Box>
  );
}

export default ExportToolbar;