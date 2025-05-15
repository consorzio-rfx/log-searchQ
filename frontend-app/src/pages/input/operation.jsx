import React, { useState } from "react";
import runsService from "../../api/runsService";
import NewRun from "./newrun";
import { useKeycloakAuthContext } from "../auth/KeycloakAuthContext";
import Typography from '@mui/material/Typography';

import { Box, TextField, Button } from '@mui/material';

const Operation = () => {
    const [runNumber, setRunNumber] = useState(null);
    const [shotNumber, setShotNumber] = useState(null);
    const [run, setRun] = useState(null);
    const [newRun, setNewRun] = useState(false);

    const { authenticated, userInfo, keycloak } = useKeycloakAuthContext();

    const handleRunNumberChange = (event) => {
        const number = event.target.value;
        setRunNumber(number);
    }

    const handleShotNumberChange = (event) => { 
        const number = event.target.value;
        setShotNumber(number);
    }


    const handleSubmit = () => {
        if (runNumber) {
            runsService.getRun(runNumber, keycloak)
                .then((res) => {
                    setRun(res.data);
                    setNewRun(false);
                })
                .catch((err) => {
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
                    setNewRun(true);
                });
        } else if (!run) {

        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px', gap: '5em' }}>
                <Box sx={{ width: '20em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                    <TextField label="Run number" type="number" value={runNumber} onChange={handleRunNumberChange}  />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Box>
                <Box sx={{ width: '20em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                    <TextField label="Shot number" type="number" value={shotNumber} onChange={handleShotNumberChange} />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
            {run && !newRun && (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            margin: '10px 10px',
                            color: '#333',
                            backgroundColor: '#ddd',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h4" sx={{ width: '100%', textAlign: 'left', marginBottom: '2px', fontWeight: 'bold' }}>
                            Current Run ID: {run.Run}
                        </Typography>

                        <Box sx={{ width: '20%' }}>
                            <p>Username: {run.Username}</p>
                            <p>Leader: {run.Leader}</p>
                        </Box>
                        <Box sx={{ width: '20%' }}>
                            <p>PreBrief: {run.PreBrief}</p>
                            <p>PostBrief: {run.PostBrief}</p>
                        </Box>
                        <Box sx={{ width: '20%' }}>
                            <p>PreKeywords: {run.PreKeywords}</p>
                            <p>PostKeywords: {run.PostKeywords}</p>
                            <p>Summary: {run.Summary}</p>
                        </Box>
                        <Box sx={{ width: '20%' }}>
                            <p>Rt: {run.Rt}</p>
                            <p>Sc: {run.Sc}</p>
                            <p>Sl: {run.Sl}</p>
                        </Box>
                    </Box>
                </Box>
            )}
            {/* NEW RUN */
             newRun && <NewRun />}
            
        </Box>
    );
};

export default Operation;
