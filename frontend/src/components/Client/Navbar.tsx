import {
  HStack,
  Image,
  Link as ChakraLink,
  Text,
  VStack,
  IconButton,
  Collapse,
  Flex,
  Box,
} from "@chakra-ui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from "../../assets/logo.jpg";
import SwitchColorMode from "./SwitchColorMode";
import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { useDisclosure } from "@chakra-ui/react";
import AuthStore from "../../store/AuthStore";

const Navbar = () => {
  const { auth, setAuth } = AuthStore();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = () => {
    axios.get("logout");
    navigate("/");
    setAuth({});
  };

  return (
    <Flex
      direction="column"
      width="100%"
      p={{ base: "5px", md: "10px" }}
      bg="gray.800"
    >
      {/* Mobile menu button */}
      <HStack
        spacing="10px"
        align="center"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          aria-label={isOpen ? "Close menu" : "Open menu"}
          icon={isOpen ? <MdClose /> : <HiMenuAlt3 />}
          onClick={onToggle}
          colorScheme="teal"
        />
        <Link to="/">
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
        </Link>
      </HStack>

      {/* Desktop Navbar */}
      <HStack
        spacing={{ base: "5px", md: "20px" }}
        align="center"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <Link to="/">
          <VStack spacing="5px">
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
              fontSize="18px"
              fontWeight="bold"
              fontFamily="'Poppins', sans-serif"
              color="white"
              letterSpacing="wider"
            >
              Game Hub
            </Text>
          </VStack>
        </Link>
        <SearchInput />
        <HStack spacing="10px">
          {auth?.accessToken ? (
            <HStack spacing="10px">
              <ChakraLink
                as={Link}
                to="/"
                fontWeight="bold"
                onClick={handleLogout}
                color="white"
              >
                Logout
              </ChakraLink>
              <Text fontWeight="bold" color="white">
                {auth.username}
              </Text>
            </HStack>
          ) : (
            <HStack spacing="10px">
              <ChakraLink
                as={Link}
                to="/signup"
                fontWeight="bold"
                color="white"
              >
                Register
              </ChakraLink>
              <ChakraLink as={Link} to="/login" fontWeight="bold" color="white">
                Login
              </ChakraLink>
            </HStack>
          )}
          <SwitchColorMode />
        </HStack>
      </HStack>

      {/* Mobile menu */}
      <Collapse in={isOpen}>
        <VStack
          spacing="10px"
          align="start"
          mt="10px"
          p="10px"
          bg="gray.700"
          borderRadius="md"
          display={{ base: "block", md: "none" }}
        >
          <SearchInput />
          <SwitchColorMode />
          {auth?.accessToken ? (
            <Box mt="5px">
              <ChakraLink
                as={Link}
                to="/"
                fontWeight="bold"
                onClick={handleLogout}
                color="white"
              >
                Logout
              </ChakraLink>
              <Text fontWeight="bold" color="white">
                {auth.username}
              </Text>
            </Box>
          ) : (
            <>
              <VStack align="start" mt="5px">
                <ChakraLink
                  as={Link}
                  to="/signup"
                  fontWeight="bold"
                  color="white"
                >
                  Register
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/login"
                  fontWeight="bold"
                  color="white"
                >
                  Login
                </ChakraLink>
              </VStack>
            </>
          )}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default Navbar;
