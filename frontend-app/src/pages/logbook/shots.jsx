import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import MultilineEditCell from "../../components/MultilineEditCell";
import shotsService from "../../api/shotsService";

const Shots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    shotsService.getAllShots().then((res) => {
      const shotsWithIds = res.data.map((row, index) => ({
        id : index + 1,
        ...row,
      }));
      setRows(shotsWithIds);
    })
  }, []);

  const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
    shotsService
      .updateShot(updatedRow)
      .then((res) => {
        const dbRow = res.data;
        setRows(oldRows.map((r) => (r.Shot === updatedRow.Shot ? {id, ...dbRow } : r)));
      })
      // .catch((err) => {
      //   console.log("AAAA");
      //   setRows(oldRows);
      // });
  };

  const onDeleteRow = (id, oldRow, oldRows) => {
    shotsService 
      .deleteShot(oldRow)
      .then((res) => {
        const dbRow = res.data;
        setRows(oldRows.filter((r) => r.Shot !== dbRow.Shot));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const createRowData = (rows) => {
    const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
    const newShot = Math.max(...rows.map((r) => (r.Shot ? r.Shot : 0) * 1)) + 1;
    return { id: newId, Shot: newShot };
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
      renderEditCell: (params) => <MultilineEditCell {...params} />,
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
      type: "number",
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
        field: "Shot",
        headerName: "Shot",
        flex: 1,
        editable: false,
    },
    {
      field: "PreBrief",
      headerName: "PreBrief",
      flex: 1,
      editable: true,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    },
    {
      field: "PostBrief",
      headerName: "PostBrief",
      flex: 1,
      editable: true,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    },
    {
      field: "PreKeywords",
      headerName: "PreKeywords",
      flex: 1,
      editable: true,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    },
    {
      field: "PostKeywords",
      headerName: "PostKeywords",
      flex: 1,
      editable: true,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    },
    {
        field: "Quality",
        headerName: "Quality",
        flex: 1,
        editable: true,
        renderEditCell: (params) => <MultilineEditCell {...params} />,
    }, 
  ];

  return (
    <Box m="20px">
      <Header
        title="Shots"
        subtitle="List of Shots"
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

export default Shots;
