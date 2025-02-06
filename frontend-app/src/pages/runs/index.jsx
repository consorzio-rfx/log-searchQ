import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Runs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [runs, setRuns] = useState([]);

  // This effect will run only once after the initial render
  useEffect(() => {
    axios
      .get("http://localhost:8080/logbook/runs")
      .then((response) => {
        // console.log("response.data", response.data);
        setRuns(response.data);
        // console.log(runs)
      });
  }, []); // <--  [] means: Run the effect only once, after initial render

  const columns = [
    {
      field: "Username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "Entered",
      headerName: "Entered",
      flex: 1,
    },
    {
      field: "Run",
      headerName: "Run",
      flex: 1,
    },
    {
      field: "PreBrief",
      headerName: "PreBrief",
      flex: 1,
    },
    {
      field: "PostBrief",
      headerName: "PostBrief",
      flex: 1,
    },
    {
      field: "PreKeywords",
      headerName: "PreKeywords",
      flex: 1,
    },
    {
      field: "PostKeywords",
      headerName: "PostKeywords",
      flex: 1,
    },
    {
      field: "Leader",
      headerName: "Leader",
      flex: 1,
    },
    {
      field: "Summary",
      headerName: "Summary",
      flex: 1,
    },
    {
      field: "Rt",
      headerName: "Rt",
      flex: 1,
    },
    {
      field: "Sc",
      headerName: "Sc",
      flex: 1,
    },
    {
      field: "Sl",
      headerName: "Sl",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="RUNS"
        subtitle="List of Runs"
      />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            "--DataGrid-containerBackground": "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700], 
          },     
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}

      >
        <DataGrid
          rows={runs}
          getRowId={(row) => row.Run}
          columns={columns}
          slots={{ toolbar: GridToolbar }} 
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>
    </Box>
  );
};

export default Runs;
