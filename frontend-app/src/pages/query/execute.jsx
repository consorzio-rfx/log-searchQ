import { Box } from "@mui/material";
import Header from "../../components/Header";

const Execute = () => {

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Execute" subtitle="Welcome to Execute" />
      </Box>
    </Box>
  );
};

export default Execute;