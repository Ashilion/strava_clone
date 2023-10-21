import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import FitnessPlotWidget from "scenes/widgets/FitnessPlotWidget";

const FitnessPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box>
            <FitnessPlotWidget/>
        </Box>
      </Box>
    </Box>
  );
};

export default FitnessPage;