import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import CustomSidebar from "./pages/global/CustomSidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./pages/home";
import Runs from "./pages/logbook/runs";
import { KeycloakAuthProvider } from "./pages/auth/KeycloakAuthContext";
import Shots from "./pages/logbook/shots";
import Query from "./pages/query/queries"
import ExecutionUnits from "./pages/query/executionUnits";
import ExecuteQuery from "./pages/query/executeQuery";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <KeycloakAuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <CustomSidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/runs" element={<Runs />} />
                <Route path="/shots" element={<Shots />} />
                <Route path="/queries" element={<Query />} />
                <Route path="/executeQuery" element={<ExecuteQuery />} />
                <Route path="/executionUnits" element={<ExecutionUnits />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </KeycloakAuthProvider>

  );
}

export default App;
