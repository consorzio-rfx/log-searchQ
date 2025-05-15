import { useTheme } from "@emotion/react";
import executionUnitsService from "../../api/executionUnitsService";
import { tokens } from "../../theme";
import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';

const ExecutionUnits = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = useState([]);
    const [selectedExecutionUnit, setSelectedExecutionUnit] = useState(null)

    const handleRowClick = (params) => {
      setSelectedExecutionUnit(params.row);
    };  

    useEffect(() => {
        executionUnitsService.getAllExecutionUnits().then((res) => {
            setRows(res.data);
        })
    }, []);

    const onDeleteExecutionUnit = () => {
      executionUnitsService 
        .deleteExecutionUnit(selectedExecutionUnit)
        .then((res) => {
          const dbRow = res.data;
          setRows(rows.filter((r) => r.id !== dbRow.id));
          setSelectedExecutionUnit(null);
        })
        .catch((err) => {
          setRows(rows);
        });
    }

    function CRUDBoxExecutionUnit() {
      const ref = useRef(null);

      useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, []);
      
      return (
      <Box ref={ref}>
        <Box display="flex" justifyContent="center" p={2}>
          <Button 
            sx={{ backgroundColor: colors.redAccent[600], color: 'white', '&:hover': { backgroundColor: colors.redAccent[400] } }} 
            size="small" variant="standard" startIcon={<DeleteIcon />} onClick={onDeleteExecutionUnit}
          >
            DELETE EXECUTION UNIT 
          </Button>
        </Box>
      </Box>)
    }

    const columns = [
        {
          field: "id",
          headerName: "id",
          flex: 0.5,
        },
        {
          field: "queryName",
          headerName: "queryName",
          flex: 1,
        },
        {
          field: "shot",
          headerName: "shot",
          flex: 1,
        },      
    ];

    return (
        <Box m="20px">
          <Header
            title="Execution Units"
            subtitle="List of Cached Execution Units"
          />
          <Box
            m="40px 0 0 0"
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                "--DataGrid-containerBackground": "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[500], 
              },     
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[500],
              },
              "& .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
    
          >
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
            />
          </Box>

          {selectedExecutionUnit !== null && <CRUDBoxExecutionUnit/>}

        </Box>
    );
}

export default ExecutionUnits;