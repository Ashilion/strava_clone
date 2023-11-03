import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import Calendar from "scenes/widgets/CalendarWidget";

const CalendarPage = () => {
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
            <Calendar />
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarPage;