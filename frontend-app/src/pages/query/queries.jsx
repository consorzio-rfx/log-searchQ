import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { AppBar, Box, Button, Divider, FormLabel, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import queriesService from "../../api/queriesService";
import CustomToolbar from "../../components/CustomToolbar";
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import Editor from "@monaco-editor/react";
import ReactMarkdown from 'react-markdown';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from 'react-router-dom';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";



const Query = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const selectedQueryRef = useRef(null);

    const navigate = useNavigate();

    const onExecuteClick = () => {
      navigate('/executeQuery');
    };

    const handleRowClick = (params) => {
        selectedQueryRef.current = params.row;
        setSelectedQuery(params.row);
    };

    const onTextFieldChange = (event) => {
      const { name, value } = event.target;
      selectedQueryRef.current[name] = value;
    }

    const handleQueryDescriptionChange = (value) => {
      selectedQueryRef.current["queryDescription"] = value
    };

    const handleExecutionUnitFunctionChange = (value) => {
      selectedQueryRef.current["executionUnitFunction"] = value
    };
    
    useEffect(() => {
        queriesService.getAllQueries().then((res) => {
            setRows(res.data);
        })
    }, []);

    const onAddQuery = () => {
        const emptyQuery = {
            id: null,
            queryName: null,
            dependencies: "",
            queryDescription: "",
            executionUnitFunction: "",
        };
        
        selectedQueryRef.current = emptyQuery
        setSelectedQuery(emptyQuery);
    }

    const onUpdateQuery = () => {
      const newQuery = selectedQueryRef.current;
      queriesService
        .updateQuery(newQuery)
        .then((res) => {
          const dbQuery = res.data;
          setRows(rows.map((r) => (r.id === newQuery.id ? dbQuery : r)));
        })
        .catch((err) => {
          setRows(rows);
        });
    }

    const onDeleteQuery = () => {
      const curQuery = selectedQueryRef.current;
      queriesService 
        .deleteQuery(curQuery)
        .then((res) => {
          const dbQuery = res.data;
          setRows(rows.filter((r) => r.id !== dbQuery.id));
          selectedQueryRef.current = null;
          setSelectedQuery(null);
        })
        .catch((err) => {
          setRows(rows);
        });
    }

    const onCancelQuery = () => {
      selectedQueryRef.current = null;
      setSelectedQuery(null);
    }

    const onSubmitQuery = () => {
      const newQuery = selectedQueryRef.current;
      queriesService
        .createQuery(newQuery)
        .then((res) => {
          selectedQueryRef.current = null;
          setSelectedQuery(null);

          queriesService.getAllQueries().then((res) => {
            setRows(res.data);
          })
        })
        .catch((err) => {
          // 
        });
    }

    function CRUDBoxQuery() {
        const ref = useRef(null);
        const [previewTrigger, setPreviewTrigger] = useState(0);

        const onPreviewTrigger = () => {
          setPreviewTrigger((prev) => (1 - prev))
        }
    
        useEffect(() => {
          ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }, []);
    
        return (
        <Box ref={ref}>
            <Box 
                component="form"
                sx={{ '& .MuiTextField-root': { m: "10px 10px 10px 0" } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    sx={{ width: "10ch" }}
                    id="id"
                    label="id"
                    name="id"
                    multiline
                    slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
                    defaultValue={selectedQuery.id}
                />
                
                <TextField
                    sx={{ width: "50ch" }}
                    id="queryName"
                    label="queryName"
                    name="queryName"
                    multiline
                    slotProps={{ inputLabel: {shrink: true} }} 
                    defaultValue={selectedQuery.queryName}
                    onChange={onTextFieldChange}
                />
                <TextField
                    sx={{ width: "50ch" }}
                    id="dependencies"
                    label="dependencies"
                    name="dependencies"
                    multiline
                    slotProps={{ inputLabel: {shrink: true} }} 
                    defaultValue={selectedQuery.dependencies}
                    onChange={onTextFieldChange}
                />
            </Box>

            <Box sx={{ display: 'flex' }}>
              <FormLabel>
                      queryDescription
              </FormLabel>

              <Button 
                  sx={{ backgroundColor: colors.grey[600], color: 'white', '&:hover': { backgroundColor: colors.grey[400] }, marginLeft: 1, marginBottom: 1 }} 
                  size="small" variant="standard" startIcon={<SyncIcon />} onClick={onPreviewTrigger}
                  >
                  PREVIEW 
                  </Button>
            </Box>

            <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                <Box sx={{ paddingRight: '10px', width: '50%'}}>
                    <Editor
                        height="50vh"
                        defaultLanguage="markdown"
                        theme="vs"
                        defaultValue={selectedQuery.queryDescription}
                        onChange={handleQueryDescriptionChange}
                    />
                </Box>

                <Box sx={{ paddingRight: '10px' }}>
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {selectedQuery.queryDescription}
                    </ReactMarkdown>
                </Box>

            </Box>

            <FormLabel>
                executionUnitFunction
            </FormLabel>
            <Box sx={{ mb: 2 }}>
                <Editor
                    height="75vh"
                    defaultLanguage="python"
                    theme="vs-dark"
                    defaultValue={selectedQuery.executionUnitFunction}
                    onChange={handleExecutionUnitFunctionChange}
                />
            </Box>

            <AppBar position="sticky" sx={{ top: 'auto', bottom: 0, bgcolor: '#FFFFFF'}}>
              {selectedQuery.id != null ?
              // SELECT
              <Box display="flex" justifyContent="space-between" p={2}>
                  <Button 
                  sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
                  size="small" variant="standard" startIcon={<DoneIcon />} onClick={onUpdateQuery}
                  >
                  UPDATE QUERY
                  </Button>

                  <Button 
                  sx={{ backgroundColor: colors.redAccent[600], color: 'white', '&:hover': { backgroundColor: colors.redAccent[400] } }} 
                  size="small" variant="standard" startIcon={<DeleteIcon />} onClick={onDeleteQuery}
                  >
                  DELETE QUERY 
                  </Button>

                  <Button 
                  sx={{ backgroundColor: colors.greenAccent[600], color: 'white', '&:hover': { backgroundColor: colors.greenAccent[400] } }} 
                  size="small" variant="standard" startIcon={<CachedIcon />} onClick={onExecuteClick}
                  >
                  EXECUTE 
                  </Button>

                  <Button 
                  sx={{ backgroundColor: colors.grey[600], color: 'white', '&:hover': { backgroundColor: colors.grey[400] } }} 
                  size="small" variant="standard" startIcon={<CancelIcon />} onClick={onCancelQuery}
                  >
                  CANCEL 
                  </Button>
              </Box>
              :
              // ADD 
              <Box display="flex" justifyContent="center" p={2}>
                  <Button 
                  sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
                  size="small" variant="standard" startIcon={<DoneIcon />} onClick={onSubmitQuery}
                  >
                  SUBMIT QUERY 
                  </Button>
              </Box>}
            </AppBar>

            <Divider sx={{ my: 2 }} />


            
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
          field: "dependencies",
          headerName: "dependencies",
          flex: 1,
        },
        {
          field: "queryDescription",
          headerName: "queryDescription",
          flex: 1,
        },        
        {
          field: "executionUnitFunction",
          headerName: "executionUnitFunction",
          flex: 1,
        },
    ];


    return (
        <Box m="20px">
          <Header
            title="Queries"
            subtitle="List of Queries"
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
              
              slots={{
                toolbar: CustomToolbar,
              }}          
              
              slotProps={{
                toolbar: {onAddRow: onAddQuery}
              }}

            />
          </Box>

          {selectedQuery !== null && <CRUDBoxQuery/>}
    
        </Box>
    );
}

export default Query;