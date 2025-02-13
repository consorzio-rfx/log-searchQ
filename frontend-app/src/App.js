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
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </KeycloakAuthProvider>

  );
}

export default App;
