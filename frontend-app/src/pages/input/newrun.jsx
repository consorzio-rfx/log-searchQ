import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import runsService from "../../api/runsService";

import Editor from "../../components/quill/editor";
import Quill from 'quill';

import Typography from "@mui/material/Typography";

const Delta = Quill.import('delta');




const NewRun = () => {
  const [run, setRun] = useState({
    Username: "",
    PreBrief: "",
    PostBrief: "",
    PreKeywords: "",
    PostKeywords: "",
    Leader: "",
    Summary: "",
    Rt: "",
    Sc: "",
    Sl: "",
  });

  // const [range, setRange] = useState();
  // const [lastChange, setLastChange] = useState();
  // const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRun((prevRun) => ({ ...prevRun, [name]: value }));
  };

  const handleSubmit = () => {
    runsService.createRun(run)
      .then((res) => {
        alert("Run created successfully!");
        setRun({
          Username: "",
          PreBrief: "",
          PostBrief: "",
          PreKeywords: "",
          PostKeywords: "",
          Leader: "",
          Summary: "",
          Rt: "",
          Sc: "",
          Sl: "",
        });
      })
      .catch((err) => {
        console.error("Error creating run:", err);
        alert("Failed to create run.");
      });
  };

  return (
    <Box component="form" sx={{ m: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="Username" name="Username" value={run.Username} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Leader" name="Leader" value={run.Leader} onChange={handleChange} fullWidth margin="normal" />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="Rt" name="Rt" value={run.Rt} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Sc" name="Sc" value={run.Sc} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Sl" name="Sl" value={run.Sl} onChange={handleChange} fullWidth margin="normal" />
      </Box>
      <TextField label="PreBrief" name="PreBrief" value={run.PreBrief} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="PostBrief" name="PostBrief" value={run.PostBrief} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="PreKeywords" name="PreKeywords" value={run.PreKeywords} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="PostKeywords" name="PostKeywords" value={run.PostKeywords} onChange={handleChange} fullWidth margin="normal" />
      
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1">Summary</Typography>
        <Editor 
          ref={quillRef}
          defaultValue={run.Summary} 
          onTextChange={(content) => handleChange({ target: { name: "Summary", value: content } })} 
        />
      </Box>
       {/* <TextField label="Summary" name="Summary" value={run.Summary} onChange={handleChange} fullWidth margin="normal" /> */}
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Create Run
      </Button>
    </Box>
  );
};

export default NewRun;

