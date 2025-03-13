import { useTheme } from "@emotion/react";
import executionUnitsService from "../../api/executionUnitsService";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

const ExecutionUnits = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        executionUnitsService.getAllExecutionUnits().then((res) => {
            setRows(res.data);
        })
    }, []);

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
            />
          </Box>

        </Box>
    );
}

export default ExecutionUnits;