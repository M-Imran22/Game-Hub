import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => navigate("/");
  const adminLogin = () => navigate("/admin/login");
  const userLogin = () => navigate("/login");

  // Determine if the role is passed via query parameters
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.800"
      color="white"
      padding="20px"
    >
      <Heading as="h1" size="2xl" marginBottom="20px">
        Unauthorized
      </Heading>

      {role === "user" ? (
        <>
          <Text fontSize="xl" marginBottom="10px">
            You are not authorized to access the admin area.
          </Text>
          <Button colorScheme="teal" onClick={userLogin}>
            Go to user Login Page
          </Button>
        </>
      ) : role === "admin" ? (
        <>
          <Text fontSize="xl" marginBottom="10px">
            You are not authorized to access this user area.
          </Text>
          <Button colorScheme="teal" onClick={adminLogin}>
            Go to Admin Login Page
          </Button>
        </>
      ) : (
        <>
          <Text fontSize="xl" marginBottom="20px">
            You are not authorized to view this page.
          </Text>
          <Button colorScheme="teal" onClick={goBack}>
            Go Back
          </Button>
        </>
      )}
    </Box>
  );
};

export default Unauthorized;
