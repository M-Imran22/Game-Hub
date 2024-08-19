import { Outlet } from "react-router-dom";
import Navbar from "../components/Admin/Navbar";
import { Box } from "@chakra-ui/react";

const AdminLayout = () => {
  return (
    <>
      <Navbar>
        <Box padding={5}>
          <Outlet />
        </Box>
      </Navbar>
    </>
  );
};

export default AdminLayout;
