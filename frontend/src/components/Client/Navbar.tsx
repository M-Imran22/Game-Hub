import { HStack, Image, Link as ChakraLink, Box } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import SwitchColorMode from "./SwitchColorMode";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <HStack padding={"10px"} justifyContent="space-between">
      <Link to="/">
        <Image
          src={logo}
          boxSize="60px"
          borderRadius={"8px"}
          objectFit="cover"
        />
      </Link>
      <SearchInput />
      <Box>
        <HStack>
          {auth?.accessToken ? (
            <Box>
              <ChakraLink
                as={Link}
                to="/logout"
                marginRight="10px"
                fontWeight="bold"
              >
                Logout
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/admin"
                marginRight="10px"
                fontWeight="bold"
              >
                Admin Portal
              </ChakraLink>
            </Box>
          ) : (
            <Box>
              <ChakraLink
                as={Link}
                to="/signup"
                marginRight="10px"
                fontWeight="bold"
              >
                Register
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/login"
                marginRight="10px"
                fontWeight="bold"
              >
                Login
              </ChakraLink>
            </Box>
          )}
          <SwitchColorMode />
        </HStack>
      </Box>
    </HStack>
  );
};

export default Navbar;
