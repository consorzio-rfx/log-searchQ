import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, FormLabel, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import FunctionsIcon from '@mui/icons-material/Functions';
import { useRef, useState } from "react";
import executeQueryService from "../../api/executeQueryService";
import { Editor } from "@monaco-editor/react";
import { DataGrid } from "@mui/x-data-grid";


const ExecuteQuery = ({ Query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const queryNameRef = useRef(null);
  const searchedShotsRef = useRef(null);

  const [selectedQuery, setSelectedQuery] = useState(null)
  const [searchedShots, setSearchedShots] = useState(null)

  const onQueryNameChange = (event) => {
    const { name, value } = event.target;
    queryNameRef.current = value;
  }

  const onSubmitQueryName = () => {
    executeQueryService.selectQuery(queryNameRef.current).then((res) => {
      setSelectedQuery(res.data)
    })
  }

  const QueryComponent = ( {selectedQuery} ) => {
    return (
      <Box>
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
                    slotProps={{ inputLabel: {shrink: true}, input: { readOnly: true} }} 
                    defaultValue={selectedQuery.queryName}
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
                        options={{
                          readOnly: true, 
                        }}
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
            <Box sx={{ mb: 2 }}>
                <Editor
                    height="75vh"
                    defaultLanguage="python"
                    theme="vs-dark"
                    defaultValue={selectedQuery.executionUnitFunction}
                    options={{
                      readOnly: true, 
                    }}
                />
            </Box>

        </Box>

    )
  }

  const onShotsChange = (event) => {
    const { name, value } = event.target;
    searchedShotsRef.current = value;
  }

  const onShowShots = () => {
    executeQueryService.searchShots(searchedShotsRef.current).then((res) => {
      const shotsWithIds = res.data.map((row, index) => ({
        id : index + 1,
        ...row,
      }));

      setSearchedShots(shotsWithIds)
    })
  }

  const ShotsComponent = ( {searchedShots} ) => {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
        editable: false,
      },
      {
        field: "username",
        headerName: "Username",
        flex: 1,
        editable: false,
      },
      {
        field: "entered",
        headerName: "Entered",
        flex: 1,
        editable: false,
      },
      {
        field: "run",
        headerName: "Run",
        flex: 1,
        type: "number",
        align: "left",
        headerAlign: "left",
        editable: false,
      },
      {
          field: "shot",
          headerName: "Shot",
          flex: 1,
          editable: false,
      },
      {
        field: "pre_brief",
        headerName: "PreBrief",
        flex: 1,
        editable: false,
      },
      {
        field: "post_brief",
        headerName: "PostBrief",
        flex: 1,
        editable: false,
      },
      {
        field: "pre_keywords",
        headerName: "PreKeywords",
        flex: 1,
        editable: false,
      },
      {
        field: "post_keywords",
        headerName: "PostKeywords",
        flex: 1,
        editable: false,
      },
      {
          field: "quality",
          headerName: "Quality",
          flex: 1,
          editable: false,
      }, 
    ];

    return (
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
            rows={searchedShots}
            columns={columns}
          />
        </Box>
    );
  }
  
  const SelectQueryDetails = () => {
    return (        
    <Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <TextField
          sx={{ width: "50ch" }}
          id="queryName"
          label="queryName"
          name="queryName"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          placeholder="e.g. testQuery1"
          onChange={onQueryNameChange}
        />

        <Button 
          sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
          size="small" variant="standard" startIcon={<SearchIcon />} onClick={onSubmitQueryName}
          >
          SHOW QUERY 
        </Button>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box>
        {selectedQuery && <QueryComponent selectedQuery={ selectedQuery }/>}
      </Box>
    </Box>) 
  }

  const SearchShotsDetails = () => {
    return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <TextField
          sx={{ width: "50ch" }}
          id="shots"
          label="shots"
          name="shots"
          multiline
          slotProps={{ inputLabel: {shrink: true} }}
          placeholder="e.g. 39390, 39391"
          onChange={onShotsChange}
        />

        <Button 
          sx={{ backgroundColor: colors.blueAccent[600], color: 'white', '&:hover': { backgroundColor: colors.blueAccent[400] } }} 
          size="small" variant="standard" startIcon={<SearchIcon />} onClick={onShowShots}
          >
          SHOW SHOTS 
        </Button>
      </Box> 

      <Divider sx={{ my: 2 }} />

      <Box>
        {searchedShots && <ShotsComponent searchedShots={searchedShots} />}
      </Box>
    </Box>)            

  }

  return (
    <Box m="20px">
      <Header
        title="Execute Query"
        subtitle="Execute Selected Query with Input"
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

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">SELECT QUERY</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <SelectQueryDetails/>
          
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">SEARCH SHOTS</Typography>
          </AccordionSummary>
          <AccordionDetails>

           <SearchShotsDetails/>
          
          </AccordionDetails>
        </Accordion>
        
      </div>

      <Box display="flex" justifyContent="center" p={2}>
        <Button 
          sx={{ backgroundColor: colors.greenAccent[600], color: 'white', '&:hover': { backgroundColor: colors.greenAccent[400] } }} 
          size="small" variant="standard" startIcon={<FunctionsIcon />} // onClick={onExecuteClick}
          >
          EXECUTE
        </Button> 
      </Box>


      </Box>

    </Box>
  );
};

export default ExecuteQuery;