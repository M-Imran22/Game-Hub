import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";
const PlatformSelecter = () => {
  const { platforms, error } = usePlatforms();
  console.log(platforms);
  if (error) return null;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Select Platform
      </MenuButton>
      <MenuList>
        {platforms.map((platform) => (
          <MenuItem key={platform.id}>{platform.slug}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelecter;
