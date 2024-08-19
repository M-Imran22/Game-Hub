import { Box, Text, VStack, Heading, Icon } from "@chakra-ui/react";
import { FaGamepad } from "react-icons/fa";

const Dashboard = () => {
  return (
    <Box
      padding="40px"
      backgroundColor="gray.800"
      borderRadius="lg"
      boxShadow="2xl"
      maxWidth="800px"
      margin="0 auto"
      textAlign="center"
      color="white"
    >
      <VStack spacing="20px">
        <Icon as={FaGamepad} boxSize="50px" color="teal.400" />
        <Heading
          fontSize="4xl"
          fontWeight="bold"
          fontFamily="'Poppins', sans-serif"
          letterSpacing="wider"
        >
          Welcome to Game Hub
        </Heading>
        <Text
          fontSize="lg"
          fontFamily="'Roboto', sans-serif"
          color="gray.300"
          lineHeight="tall"
        >
          Explore a world of games, manage your products, and create new
          experiences. Your journey begins here!
        </Text>
      </VStack>
    </Box>
  );
};

export default Dashboard;
