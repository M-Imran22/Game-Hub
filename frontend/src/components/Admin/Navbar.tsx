import { Link as ChakraLink, Flex, HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import SwitchColorMode from "../Client/SwitchColorMode";

const Navbar = () => {
  const location = useLocation();
  return (
    <HStack padding={"10px"} width="100%" justifyContent="space-between">
      <Link to="/admin">
        <Image
          src={logo}
          boxSize="60px"
          borderRadius={"8px"}
          objectFit="cover"
        />
      </Link>
      <Flex>
        <ChakraLink as={Link} to="/" marginRight="15px">
          Vist Site
        </ChakraLink>
        <ChakraLink
          as={Link}
          to="/admin"
          marginRight="15px"
          fontWeight={location.pathname === "/admin" ? "bold" : "normal"}
        >
          All Products
        </ChakraLink>
        <ChakraLink
          as={Link}
          to="/admin/newgame"
          fontWeight={
            location.pathname === "/admin/newgame" ? "bold" : "normal"
          }
        >
          Add New Game
        </ChakraLink>
      </Flex>
      <SwitchColorMode />
    </HStack>
  );
};

export default Navbar;
