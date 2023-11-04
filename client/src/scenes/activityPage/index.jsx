import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import DashboardActivityWidget from "scenes/widgets/DashboardActivityWidget";

const ActivityPage = ({id}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const {activity, setActivity} = useState();
  const getActivity = async () => {
    const response = await fetch(`http://localhost:3001/activity/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setActivity(await response.json());
  }
  useEffect(() => {
    getActivity();
  }, []);
  return (
    <Box>
      <Navbar />
      <DashboardActivityWidget />
    </Box>
  );
};

export default ActiviyPage;
