import { Box } from "@mui/material";
import Header from "../../components/Header";

const Home = () => {

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOMEPAGE" subtitle="Welcome to homepage" />
      </Box>
    </Box>
  );
};

export default Home;