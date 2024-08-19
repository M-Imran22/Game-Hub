import { HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";

const Navbar3 = () => {
  return (
    <HStack padding="10px">
      <Image src={logo} boxSize="60px" borderRadius={"8px"} objectFit="cover" />
    </HStack>
  );
};

export default Navbar3;
