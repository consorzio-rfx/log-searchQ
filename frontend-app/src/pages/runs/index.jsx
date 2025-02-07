import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import runsService from "../api/runsService";
import FullEditDataGrid from "mui-datagrid-full-edit";

const Runs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    runsService.getAllRuns().then((res) => {
      const runsWithIds = res.data.map((row, index) => ({
        id : index + 1,
        ...row,
      }));
      setRows(runsWithIds);
    })
  }, []);

  const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
    runsService
      .updateRun(updatedRow)
      .then((res) => {
        const dbRow = res.data;
        setRows(oldRows.map((r) => (r.Run === updatedRow.Run ? {id, ...dbRow } : r)));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const onDeleteRow = (id, oldRow, oldRows) => {
    runsService 
      .deleteRun(oldRow)
      .then((res) => {
        const dbRow = res.data;
        setRows(oldRows.filter((r) => r.Run !== dbRow.Run));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const createRowData = (rows) => {
    const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
    const newRun = Math.max(...rows.map((r) => (r.Run ? r.Run : 0) * 1)) + 1;
    return { id: newId, Run: newRun };
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      editable: false,
    },
    {
      field: "Username",
      headerName: "Username",
      flex: 1,
      editable: true,
    },
    {
      field: "Entered",
      headerName: "Entered",
      flex: 1,
      editable: false,
    },
    {
      field: "Run",
      headerName: "Run",
      flex: 1,
      editable: false,
    },
    {
      field: "PreBrief",
      headerName: "PreBrief",
      flex: 1,
      editable: true,
    },
    {
      field: "PostBrief",
      headerName: "PostBrief",
      flex: 1,
      editable: true,
    },
    {
      field: "PreKeywords",
      headerName: "PreKeywords",
      flex: 1,
      editable: true,
    },
    {
      field: "PostKeywords",
      headerName: "PostKeywords",
      flex: 1,
      editable: true,
    },
    {
      field: "Leader",
      headerName: "Leader",
      flex: 1,
      editable: true,
    },
    {
      field: "Summary",
      headerName: "Summary",
      flex: 1,
      editable: true,
    },
    {
      field: "Rt",
      headerName: "Rt",
      flex: 1,
      editable: true,
    },
    {
      field: "Sc",
      headerName: "Sc",
      flex: 1,
      editable: true,
    },
    {
      field: "Sl",
      headerName: "Sl",
      flex: 1,
      editable: true,
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
        <FullEditDataGrid
          rows={rows}
          columns={columns}
          onSaveRow={onSaveRow}
          onDeleteRow={onDeleteRow}
          createRowData={createRowData}
        />
      </Box>
    </Box>
  );
};

export default Runs;
