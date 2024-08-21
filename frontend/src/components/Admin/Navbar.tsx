import {
  Box,
  Flex,
  VStack,
  Heading,
  Link as ChakraLink,
  Image,
  Text,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from "../../assets/logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import AuthStore from "../../store/AuthStore";

interface Props {
  children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
  const { auth, setAuth } = AuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    axios.get("logout");
    navigate("/");
    setAuth({});
  };

  const pageName = () => {
    switch (location.pathname) {
      case "/admin/signup":
        return "Admin Signup";
      case "/admin/login":
        return "Admin Login";
      case "/admin/allproducts":
        return "All Products";
      case "/admin/newgame":
        return "Add New Game";
      default:
        return "Admin Dashboard";
    }
  };

  const sidebarWidth = useBreakpointValue({ base: "100%", md: "300px" });
  const isSidebarVisible = useBreakpointValue({ base: isOpen, md: true });

  return (
    <Flex
      height="100vh"
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
    >
      {/* Sidebar */}
      <Flex
        height={{ base: "auto", md: "100vh" }}
        width={sidebarWidth}
        direction="column"
        padding="20px"
        backgroundColor="#181818"
        position={{ base: "absolute", md: "sticky" }}
        top={0}
        left={0}
        zIndex={1}
        overflowY="auto"
        display={isSidebarVisible ? "flex" : "none"}
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
        {auth.username ? (
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
                location.pathname === "/admin/dashboard"
                  ? "gray.100"
                  : "gray.300"
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
                location.pathname === "/admin/allproducts"
                  ? "gray.100"
                  : "gray.300"
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
                location.pathname === "/admin/newgame" ? "gray.100" : "gray.300"
              }
            >
              Add New Game
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/admin/signup"
              fontWeight={
                location.pathname === "/admin/signup" ? "bold" : "normal"
              }
              color={
                location.pathname === "/admin/signup" ? "gray.100" : "gray.300"
              }
            >
              Add New Admin
            </ChakraLink>
            <ChakraLink as={Link} to="/admin/login" onClick={handleLogout}>
              Logout
            </ChakraLink>
          </VStack>
        ) : (
          <Text>Welcome to Game Hub</Text>
        )}
      </Flex>

      {/* Sidebar Toggle Button */}
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isOpen ? <MdClose /> : <HiMenuAlt3 />}
        onClick={isOpen ? onClose : onOpen}
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top="10px"
        left="10px"
        zIndex={2}
        colorScheme="teal"
      />

      {/* Navbar */}
      <Flex direction="column" flex="1">
        <HStack
          padding="25px"
          justifyContent="space-between"
          backgroundColor="#303030"
        >
          <Heading size="md">{pageName()}</Heading>
          <Text
            color="gray.300"
            fontWeight="bold"
            fontSize="xl"
            letterSpacing="wider"
            fontFamily="'Poppins', sans-serif"
          >
            {auth.username}
          </Text>
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
