import { Box, IconButton, Popover, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import OAuthSignInPage from "../auth/signin.tsx";
import { useKeycloakAuthContext } from "../auth/KeycloakAuthContext.js";

const Topbar = () => {
  const { authenticated, userInfo, keycloak } = useKeycloakAuthContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [openLogin, setOpenLogin] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePersonIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePersonIconClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        {!authenticated &&
        <IconButton>
          < LoginIcon onClick={() => setOpenLogin(true)}/>
        </IconButton>}

        <IconButton>
          <PersonOutlinedIcon aria-describedby={id} onClick={handlePersonIconClick}/>
        </IconButton>
        
        {authenticated && <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePersonIconClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >

          <Box sx={{ p: 2, bgcolor: colors.blueAccent[900]}}>
            <Typography>Name: {userInfo?.name}</Typography>
            <Typography>Email: {userInfo?.email}</Typography>
            <Typography>Username: {userInfo?.preferred_username}</Typography>
          </Box> 

        </Popover>}

        {authenticated &&
        <IconButton>
          < LogoutIcon onClick={() => {
              setOpenLogin(false);
              keycloak.logout();
            }}/>
        </IconButton>} 

        <OAuthSignInPage open={openLogin} onClose={() => setOpenLogin(false)}/>
      </Box>
    </Box>
  );
};

export default Topbar;
