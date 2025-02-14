import { Box, Button, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MultilineEditCell from "../../components/MultilineEditCell";
import shotsService from "../../api/shotsService";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../components/CustomToolbar";
import CustomPagination from "../../components/CustomPagination";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const Shots = ({ Run }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const [selectedShot, setSelectedShot] = useState(null);
  const selectedShotRef = useRef(null);

  const handleRowClick = (params) => {
    selectedShotRef.current = params.row;
    setSelectedShot(params.row);
  };

  const onTextFieldChange = (event) => {
    const { name, value } = event.target;
    selectedShotRef.current[name] = value;
  }

  const fetchData = (paginationModel) => {
    setLoading(true);
    shotsService.getShots(Run, paginationModel.page + 1, paginationModel.pageSize).then((res) => {
      const shotsWithIds = res.data.shots.map((row, index) => ({
        id : index + 1 + (paginationModel.page * paginationModel.pageSize),
        ...row,
      }));
      
      setRows(shotsWithIds);
      setTotalRows(res.data.totalShots);
    }).finally(() => {setLoading(false)});
  }

  useEffect(() => {
    fetchData(paginationModel);
  }, [paginationModel]);

  const onUpdateShot = () => {
    const newShot = selectedShotRef.current;
    shotsService
      .updateShot(newShot)
      .then((res) => {
        const dbShot = res.data;
        setRows(rows.map((r) => (r.Shot === newShot.Shot ? { id: newShot.id, ...dbShot } : r)));
      })
      .catch((err) => {
        setRows(rows);
      });
  }

  const onDeleteShot = () => {
    const curShot = selectedShotRef.current;
    shotsService 
      .deleteShot(curShot)
      .then((res) => {
        const dbShot = res.data;
        setRows(rows.filter((r) => r.Shot !== dbShot.Shot));
        
        selectedShotRef.current = null;
        setSelectedShot(null);
        setTotalRows((prev) => (prev - 1));
      })
      .catch((err) => {
        setRows(rows);
      });
  }

  const onAddShot = () => {
    if (Run !== null && Run !== undefined) {
      const emptyShot = {
        id: null,
        Username: null,
        Entered: null,
        Run: Run,
        Shot: null,
        PreBrief: null,
        PostBrief: null,
        PreKeywords: null,
        PostKeywords: null,
        Quality: null,
      };
  
      selectedShotRef.current = emptyShot;
      setSelectedShot(emptyShot);
    }
  }

  const onSubmitShot = () => {
    const newShot = selectedShotRef.current;
    shotsService 
      .createShot(newShot)
      .then((res) => {
        selectedShotRef.current = null;
        setSelectedShot(null);
        fetchData(paginationModel);
      })
      .catch((err) => {
        // 
      });
  }

  function CRUDBoxShot() {
    const ref = useRef(null);

    useEffect(() => {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    return (
    <Box ref={ref}>
      <Box 
        component="form"
        sx={{ '& .MuiTextField-root': { m: "10px 10px 10px 0", width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="ID"
          label="ID"
          name="id"
          multiline
          slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
          defaultValue={selectedShot.id}
        /> 
        <TextField
          id="Username"
          label="Username"
          name="Username"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedShot.Username}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Entered"
          label="Entered"
          name="Entered"
          slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
          multiline
          defaultValue={selectedShot.Entered}
        />
        <TextField
          id="Run"
          label="Run"
          name="Run"
          slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
          multiline
          defaultValue={selectedShot.Run}
        />
        <TextField
          id="Shot"
          label="Shot"
          name="Shot"
          slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
          multiline
          defaultValue={selectedShot.Shot}
        />
        <TextField
          id="PreBrief"
          label="PreBrief"
          name="PreBrief"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedShot.PreBrief}
          onChange={onTextFieldChange}
        />
        <TextField
          id="PostBrief"
          label="PostBrief"
          name="PostBrief"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedShot.PostBrief}
          onChange={onTextFieldChange}
        />
        <TextField
          id="PreKeywords"
          label="PreKeywords"
          name="PreKeywords"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedShot.PreKeywords}
          onChange={onTextFieldChange}
        />
        <TextField
          id="PostKeywords"
          label="PostKeywords"
          name="PostKeywords"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedShot.PostKeywords}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Summary"
          label="Summary"
          name="Summary"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedShot.Leader}
          onChange={onTextFieldChange}
        />
      </Box>

      {selectedShot.Shot != null ?
      // SELECT SHOT 
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button 
          sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
          size="small" variant="standard" startIcon={<DoneIcon />} onClick={onUpdateShot}
        >
          UPDATE SHOT
        </Button>

        <Button 
          sx={{ backgroundColor: colors.redAccent[600], color: 'white', '&:hover': { backgroundColor: colors.redAccent[400] } }} 
          size="small" variant="standard" startIcon={<DeleteIcon />} onClick={onDeleteShot}
        >
          DELETE SHOT 
        </Button>
      </Box>
      :
      // ADD SHOT
      <Box display="flex" justifyContent="center" p={2}>
      <Button 
        sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
        size="small" variant="standard" startIcon={<DoneIcon />} onClick={onSubmitShot}
      >
        SUBMIT SHOT
      </Button>
    </Box>}
    </Box>)
  }

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
    <Box m={(Run !== null && Run !== undefined) ? "0px" : "20px"}>
      <Header
        title="Shots"
        subtitle={(Run !== null && Run !== undefined) ? ("List of Shots of Run " + Run) : "List of Shots"}
      />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            "--DataGrid-containerBackground": "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700], 
          },     
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
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

          pagination
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: {onAddRow: onAddShot}
          }}

          paginationMode="server"
          rowCount={totalRows}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />

        {selectedShot !== null && <CRUDBoxShot />}
      </Box>
    </Box>
  );
};

export default Shots;
