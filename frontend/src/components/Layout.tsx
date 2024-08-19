import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
