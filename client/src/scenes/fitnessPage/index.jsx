import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import FitnessPlotWidget from "scenes/widgets/FitnessPlotWidget";
import ZoneFcBarWidget from "scenes/widgets/ZonesFcBarWidget";
import LineChart from "components/LineChart";

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
            <ZoneFcBarWidget />
            <LineChart get_url="http://localhost:3001/activity/heartrate" curve ="catmullRom"/>
            <LineChart get_url="http://localhost:3001/activity/pace" curve="catmullRom"/>
            <LineChart get_url="http://localhost:3001/activity/denivele" curve="catmullRom" />
        </Box>
      </Box>
    </Box>
  );
};

export default FitnessPage;