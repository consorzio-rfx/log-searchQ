import logo from './logo.svg';
import './App.css';
import ApiExample from './examples/ApiExample';
import FeedFetch from './examples/FeedFetch';
import DummyItem from './components/DummyItem';
import FeedList from './components/feed/FeedList';

import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" width={200} />
//         <p>
//           Testbed rewfront react
//         </p>
//       </header>
//       <FeedList />
//     </div>
//   );
// }

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      {/* Top Navbar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>
          <Button color="inherit">Profile</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {["Home", "Reports", "Settings", "Logout"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Card 1</Typography>
              <Typography>
                This is the content of the first card. You can put anything
                here.
              </Typography>
            </Paper>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Card 2</Typography>
              <Typography>
                Content for card 2. Add graphs, lists, or any other widgets.
              </Typography>
            </Paper>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Card 3</Typography>
              <Typography>
                This card adjusts based on the screen size.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: 2 }}>
            <FeedList />
      </Box>
    </div>
  );
};

export default App;
