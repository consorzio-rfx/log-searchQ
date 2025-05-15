import { gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination';

function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <MuiPagination
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }
  
function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default CustomPagination;