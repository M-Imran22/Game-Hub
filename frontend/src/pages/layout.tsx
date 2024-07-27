import { Outlet } from "react-router-dom";
import Navbar from "../components/Client/Navbar";
import { Box } from "@chakra-ui/react";

const layout = () => {
  return (
    <>
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default layout;
