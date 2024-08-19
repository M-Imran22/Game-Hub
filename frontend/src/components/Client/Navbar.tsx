import { HStack, Image, Link as ChakraLink, Box, Text } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import SwitchColorMode from "./SwitchColorMode";
import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../services/axios";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get("logout");
    navigate("/");
    setAuth({});
  };

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
              <HStack>
                <ChakraLink
                  as={Link}
                  to="/"
                  marginRight="10px"
                  fontWeight="bold"
                  onClick={handleLogout}
                >
                  Logout
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/admin/dashboard"
                  marginRight="10px"
                  fontWeight="bold"
                >
                  Admin Portal
                </ChakraLink>
                <Text marginRight="10px" fontWeight="bold">
                  {auth.username}
                </Text>
              </HStack>
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
