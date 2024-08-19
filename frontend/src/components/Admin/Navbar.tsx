import {
  Box,
  Flex,
  VStack,
  Heading,
  Link as ChakraLink,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import SwitchColorMode from "../Client/SwitchColorMode";

interface Props {
  children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
  const location = useLocation();

  // Dynamically set page name based on location
  const pageName = () => {
    switch (location.pathname) {
      case "/admin/allproducts":
        return "All Products";
      case "/admin/newgame":
        return "Add New Game";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <Flex height="100vh" overflow="hidden">
      {/* Sidebar */}
      <Flex
        height="100vh"
        width="300px"
        direction="column"
        padding="20px"
        backgroundColor="#181818"
      >
        <Link to="/admin/dashboard">
          <HStack spacing="15px" marginBottom={10}>
            <Image
              src={logo}
              boxSize="60px"
              borderRadius="full"
              objectFit="cover"
              boxShadow="lg"
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.1)" }}
            />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              fontFamily="'Poppins', sans-serif"
              color="white"
              letterSpacing="wider"
            >
              Game Hub
            </Text>
          </HStack>
        </Link>
        <VStack
          align="start"
          spacing="10px"
          flexGrow={1}
          fontFamily="'Roboto', sans-serif"
          color="gray.300"
        >
          <ChakraLink
            as={Link}
            to="/admin/dashboard"
            fontWeight={
              location.pathname === "/admin/dashboard" ? "bold" : "normal"
            }
            color={
              location.pathname === "/admin/dashboard" ? "gray.100" : "gray.300"
            }
            marginBottom="10px"
          >
            Admin Dashboard
          </ChakraLink>
          <ChakraLink as={Link} to="/">
            Visit Site
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/admin/allproducts"
            fontWeight={
              location.pathname === "/admin/allproducts" ? "bold" : "normal"
            }
            color={
              location.pathname === "/admin/dashboard" ? "gray.100" : "gray.300"
            }
          >
            All Products
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/admin/newgame"
            fontWeight={
              location.pathname === "/admin/newgame" ? "bold" : "normal"
            }
            color={
              location.pathname === "/admin/dashboard" ? "gray.100" : "gray.300"
            }
          >
            Add New Game
          </ChakraLink>
        </VStack>
      </Flex>

      {/* Navbar */}
      <Flex direction="column" flex="1">
        <HStack
          padding="25px"
          justifyContent="space-between"
          backgroundColor="	#303030"
        >
          <Heading size="md">{pageName()}</Heading>
          <SwitchColorMode />
        </HStack>

        {/* Main content */}
        <Box padding="20px" flex="1" overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
