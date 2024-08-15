import { Box, Link as ChakraLink, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Box>
      <Heading>Unauthorized</Heading>
      <Text>You are not authorized to view this page.</Text>
      <ChakraLink onClick={goBack}>Go Back</ChakraLink>
    </Box>
  );
};

export default Unauthorized;
