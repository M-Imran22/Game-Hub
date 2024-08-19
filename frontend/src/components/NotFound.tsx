// NotFound.jsx or NotFound.tsx
import { Box, Heading, Text } from "@chakra-ui/react";

const NotFound = () => (
  <Box textAlign="center" padding="20px">
    <Heading as="h1" size="2xl">
      404 - Page Not Found
    </Heading>
    <Text fontSize="lg" marginTop="10px">
      The page you're looking for does not exist.
    </Text>
  </Box>
);

export default NotFound;
