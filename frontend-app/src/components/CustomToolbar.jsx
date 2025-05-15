import { Box, Button } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';

function CustomToolbar({ onAddRow }) {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector/>
        <GridToolbarQuickFilter/>
        <Box sx={{ flexGrow: 1 }} />
        <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={onAddRow}>
          ADD ROW
        </Button>
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
      </GridToolbarContainer>
    );
}

export default CustomToolbar;