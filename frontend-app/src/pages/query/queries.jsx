import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Button, Divider, FormLabel, TextField, Typography } from "@mui/material";
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


const Query = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);

    const handleRowClick = (params) => {
        setSelectedQuery(params.row);
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
            queryDescription: null,
            executionUnitFunction: null,
        };
    
        setSelectedQuery(emptyQuery);
    }

    function CRUDBoxQuery() {
        const ref = useRef(null);
    
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
                    // onChange={onTextFieldChange}
                />
            </Box>

            <FormLabel>
                    queryDescription
            </FormLabel>
            <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                <Box sx={{ paddingRight: '10px', width: '50%'}}>
                    <Editor
                        height="25vh"
                        defaultLanguage="markdown"
                        theme="vs"
                        defaultValue={selectedQuery.queryDescription}
                    />
                </Box>
                
                {/* <Box sx={{ paddingRight: '10px' }}>
                    <ReactMarkdown>
                        {selectedQuery.queryDescription}
                    </ReactMarkdown>
                </Box> */}

            </Box>

            <FormLabel>
                executionUnitFunction
            </FormLabel>
            <Box>
                <Editor
                    height="75vh"
                    defaultLanguage="python"
                    theme="vs-dark"
                    defaultValue={selectedQuery.executionUnitFunction}
                />
            </Box>

            {selectedQuery.id != null ?
            // SELECT
            <Box display="flex" justifyContent="space-between" p={2}>
                <Button 
                sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
                size="small" variant="standard" startIcon={<DoneIcon />} // onClick={onUpdateRun}
                >
                UPDATE QUERY
                </Button>

                <Button 
                sx={{ backgroundColor: colors.redAccent[600], color: 'white', '&:hover': { backgroundColor: colors.redAccent[400] } }} 
                size="small" variant="standard" startIcon={<DeleteIcon />} // onClick={onDeleteRun}
                >
                DELETE QUERY 
                </Button>

                <Button 
                sx={{ backgroundColor: colors.greenAccent[600], color: 'white', '&:hover': { backgroundColor: colors.greenAccent[400] } }} 
                size="small" variant="standard" startIcon={<CachedIcon />} // onClick={onShowShot}
                >
                EXECUTE 
                </Button>

                <Button 
                sx={{ backgroundColor: colors.grey[600], color: 'white', '&:hover': { backgroundColor: colors.grey[400] } }} 
                size="small" variant="standard" startIcon={<CancelIcon />} // onClick={onCancelRun}
                >
                CANCEL 
                </Button>
            </Box>
            :
            // ADD 
            <Box display="flex" justifyContent="center" p={2}>
                <Button 
                sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
                size="small" variant="standard" startIcon={<DoneIcon />} // onClick={onSubmitRun}
                >
                SUBMIT QUERY 
                </Button>
            </Box>}

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
          field: "queryDescription",
          headerName: "queryDescription",
          flex: 1,
        },        {
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