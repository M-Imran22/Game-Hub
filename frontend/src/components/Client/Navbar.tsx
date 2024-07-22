import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.jpg";
import SwitchColorMode from "./SwitchColorMode";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  return (
    <HStack padding={"10px"}>
      <Image src={logo} boxSize="60px" borderRadius={"8px"} />
      <SearchInput onSearch={onSearch} />
      <SwitchColorMode />
    </HStack>
  );
};

export default Navbar;
