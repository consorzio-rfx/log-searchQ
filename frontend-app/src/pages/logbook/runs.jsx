import { Box, Button, Divider, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import runsService from "../../api/runsService";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import CustomPagination from "../../components/CustomPagination";
import CustomToolbar from "../../components/CustomToolbar";
import Shots from "./shots";
import { useKeycloakAuthContext } from "../auth/KeycloakAuthContext";


const Runs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { authenticated, userInfo, keycloak } = useKeycloakAuthContext();

  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const [selectedRun, setSelectedRun] = useState(null);
  const selectedRunRef = useRef(null);

  const [showShot, setShowShot] = useState(false); 
  
  const handleRowClick = (params) => {
    setShowShot(false);

    selectedRunRef.current = params.row;
    setSelectedRun(params.row);
  };

  const onTextFieldChange = (event) => {
    const { name, value } = event.target;
    selectedRunRef.current[name] = value;
  }

  const fetchData = (paginationModel) => {
    setLoading(true);
    runsService.getRuns(paginationModel.page + 1, paginationModel.pageSize, keycloak).then(res => {
      const runsWithIds = res.data.runs.map((row, index) => ({
        id : index + 1 + (paginationModel.page * paginationModel.pageSize),
        ...row,
      }));
      
      setRows(runsWithIds);
      setTotalRows(res.data.totalRuns);
    }, error => {
      if (error.response && error.response.status === 401) {
        console.warn("Unauthorized!");
      }
    }).finally(() => {setLoading(false)});
  }

  useEffect(() => {
    fetchData(paginationModel);
  }, [authenticated, paginationModel]);

  const onUpdateRun = () => {
    const newRun = selectedRunRef.current;
    runsService
      .updateRun(newRun)
      .then((res) => {
        const dbRun = res.data;
        setRows(rows.map((r) => (r.Run === newRun.Run ? { id: newRun.id, ...dbRun } : r)));
      })
      .catch((err) => {
        setRows(rows);
      });
  }

  const onDeleteRun = () => {
    const curRun = selectedRunRef.current;
    runsService 
      .deleteRun(curRun)
      .then((res) => {
        const dbRun = res.data;
        setRows(rows.filter((r) => r.Run !== dbRun.Run));
        selectedRunRef.current = null;
        setSelectedRun(null);
        setTotalRows((prev) => (prev - 1));
      })
      .catch((err) => {
        setRows(rows);
      });
  }

  const onAddRun = () => {
    const emptyRun = {
      id: null,
      Username: null,
      Entered: null,
      Run: null,
      PreBrief: null,
      PostBrief: null,
      PreKeywords: null,
      PostKeywords: null,
      Leader: null,
      Summary: null,
      Rt: null,
      Sc: null,
      Sl: null,
    };

    setShowShot(false);
    selectedRunRef.current = emptyRun;
    setSelectedRun(emptyRun);
  }

  const onSubmitRun = () => {
    const newRun = selectedRunRef.current;
    runsService
      .createRun(newRun)
      .then((res) => {
        selectedRunRef.current = null;
        setSelectedRun(null);
        fetchData(paginationModel);
      })
      .catch((err) => {
        // 
      });
  }

  const onShowShot = () => {
    setShowShot(true);
  }

  const onCancelRun = () => {
    setShowShot(false);
    selectedRunRef.current = null;
    setSelectedRun(null);
  }

  function CRUDBoxRun() {
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
          defaultValue={selectedRun.id}
        /> 
        <TextField
          id="Username"
          label="Username"
          name="Username"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.Username}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Entered"
          label="Entered"
          name="Entered"
          slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
          multiline
          defaultValue={selectedRun.Entered}
        />
        <TextField
          id="Run"
          label="Run"
          name="Run"
          slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
          multiline
          defaultValue={selectedRun.Run}
        />
        <TextField
          id="PreBrief"
          label="PreBrief"
          name="PreBrief"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.PreBrief}
          onChange={onTextFieldChange}
        />
        <TextField
          id="PostBrief"
          label="PostBrief"
          name="PostBrief"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.PostBrief}
          onChange={onTextFieldChange}
        />
        <TextField
          id="PreKeywords"
          label="PreKeywords"
          name="PreKeywords"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.PreKeywords}
          onChange={onTextFieldChange}
        />
        <TextField
          id="PostKeywords"
          label="PostKeywords"
          name="PostKeywords"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.PostKeywords}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Leader"
          label="Leader"
          name="Leader"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.Leader}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Summary"
          label="Summary"
          name="Summary"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.Summary}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Rt"
          label="Rt"
          name="Rt"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.Rt}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Sc"
          label="Sc"
          name="Sc"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.Sc}
          onChange={onTextFieldChange}
        />
        <TextField
          id="Sl"
          label="Sl"
          name="Sl"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          defaultValue={selectedRun.Sl}
          onChange={onTextFieldChange}
        />
      </Box>

      {selectedRun.Run != null ?
      // SELECT RUN
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button 
          sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
          size="small" variant="standard" startIcon={<DoneIcon />} onClick={onUpdateRun}
        >
          UPDATE RUN
        </Button>

        <Button 
          sx={{ backgroundColor: colors.redAccent[600], color: 'white', '&:hover': { backgroundColor: colors.redAccent[400] } }} 
          size="small" variant="standard" startIcon={<DeleteIcon />} onClick={onDeleteRun}
        >
          DELETE RUN
        </Button>

        <Button 
          sx={{ backgroundColor: colors.greenAccent[600], color: 'white', '&:hover': { backgroundColor: colors.greenAccent[400] } }} 
          size="small" variant="standard" startIcon={<AddIcon />} onClick={onShowShot}
        >
          SHOW SHOT 
        </Button>

        <Button 
          sx={{ backgroundColor: colors.grey[600], color: 'white', '&:hover': { backgroundColor: colors.grey[400] } }} 
          size="small" variant="standard" startIcon={<CancelIcon />} onClick={onCancelRun}
        >
          CANCEL 
        </Button>
      </Box>
      : 
      // ADD RUN
      <Box display="flex" justifyContent="center" p={2}>
        <Button 
          sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
          size="small" variant="standard" startIcon={<DoneIcon />} onClick={onSubmitRun}
        >
          SUBMIT RUN
        </Button>
      </Box>}

      <Divider sx={{ my: 2 }} />

      {showShot && <Shots Run={selectedRun.Run}/>}
    </Box>)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
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
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}

          pagination
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
          slotProps={{
            toolbar: {onAddRow: onAddRun}
          }}

          paginationMode="server"
          rowCount={totalRows}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Box>

      {selectedRun !== null && <CRUDBoxRun />}

    </Box>
  );
};

export default Runs;
