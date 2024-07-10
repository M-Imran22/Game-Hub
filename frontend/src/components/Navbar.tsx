import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.jpg";
import SwitchColorMode from "./SwitchColorMode";

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" padding={"10px"}>
      <Image src={logo} boxSize="60px" borderRadius={"8px"} />
      <SwitchColorMode />
    </HStack>
  );
};

export default Navbar;
