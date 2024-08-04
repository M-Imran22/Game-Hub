import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../../hooks/usePlatforms";
import useGameQueryStore from "../../store/gameQueryStore";

const PlatformSelecter = () => {
  const { data: platforms, error } = usePlatforms();
  const setPlatform = useGameQueryStore((s) => s.setPlatform);
  const selectedPlatform = useGameQueryStore((s) => s.gameQuery.platform);
  if (error) return null;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {platforms?.map((platform) => (
          <MenuItem onClick={() => setPlatform(platform)} key={platform.id}>
            {platform.slug}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelecter;
