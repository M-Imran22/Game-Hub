import { HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import SwitchColorMode from "./SwitchColorMode";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <HStack padding={"10px"}>
      <Link to="/">
        <Image
          src={logo}
          boxSize="60px"
          borderRadius={"8px"}
          objectFit="cover"
        />
      </Link>
      <SearchInput />
      <SwitchColorMode />
    </HStack>
  );
};

export default Navbar;
