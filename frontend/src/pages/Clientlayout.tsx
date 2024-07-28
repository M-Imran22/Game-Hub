import { Outlet } from "react-router-dom";
import Navbar from "../components/Client/Navbar";
import { Box } from "@chakra-ui/react";

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default ClientLayout;
