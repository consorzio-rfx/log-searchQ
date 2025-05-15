import { useState } from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import CodeIcon from '@mui/icons-material/Code';
import CachedIcon from '@mui/icons-material/Cached';
import FunctionsIcon from '@mui/icons-material/Functions';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      icon={icon}
      component={<Link to={to} />}
      onClick={() => setSelected(title)}
    >
      {title}
    </MenuItem>
  );
};

const CustomSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
        },
        [`& .${menuClasses.active}`]: {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar style={{ height: "100vh" }} collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3">RFX</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Home" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>Logbook</Typography>
            <Item title="Runs" to="/runs" icon={<StorageOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Shots" to="/shots" icon={<DatasetOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>Query</Typography>
            <Item title="Queries" to="/queries" icon={<CodeIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Execute Query" to="/executeQuery" icon={<FunctionsIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Execution Units" to="/executionUnits" icon={<CachedIcon />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default CustomSidebar;
