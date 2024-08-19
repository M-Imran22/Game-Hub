import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";

const Logo = () => {
  return (
    <HStack padding="10px">
      <VStack spacing="5px">
        <Image
          src={logo}
          boxSize="50px"
          borderRadius="full"
          objectFit="cover"
          boxShadow="lg"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.1)" }}
        />
        <Text
          fontSize="16px"
          fontWeight="bold"
          fontFamily="'Poppins', sans-serif"
          color="white"
          letterSpacing="wider"
        >
          Game Hub
        </Text>
      </VStack>
    </HStack>
  );
};

export default Logo;
