import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExecuteQuery = ({ Query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="20px">
      <Header
        title="Execute Query"
        subtitle="Execute Selected Query"
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
            <Typography component="span">Select Query</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Query Details 
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Search Input</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Input Details
          </AccordionDetails>
        </Accordion>
        
      </div>

      </Box>

    </Box>
  );
};

export default ExecuteQuery;