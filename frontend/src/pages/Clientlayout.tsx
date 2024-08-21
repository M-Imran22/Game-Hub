import { Outlet } from "react-router-dom";
import Navbar from "../components/Client/Navbar";
import { Box } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import SuccessPopup from "../components/SuccessPopup";
import AuthStore from "../store/AuthStore";

const ClientLayout = () => {
  const { auth } = AuthStore();
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const previousUsername = useRef<string | null>(null);

  useEffect(() => {
    if (auth.username && !previousUsername.current) {
      setPopupMessage(`Welcome to the Game Hub ${auth.username}`);
      setTimeout(() => setPopupMessage(null), 5000);
    } else if (!auth.username && previousUsername.current) {
      setPopupMessage("User logged out");
      setTimeout(() => setPopupMessage(null), 5000);
    }

    previousUsername.current = auth.username;
  }, [auth.username]);

  return (
    <Box padding={5}>
      <Navbar />
      <Box padding={5}>
        <Outlet />
        {popupMessage && <SuccessPopup message={popupMessage} />}
      </Box>
    </Box>
  );
};

export default ClientLayout;
