import { HStack, Icon } from "@chakra-ui/react";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { IconType } from "react-icons";
import Platform from "../../entities/Platform";

interface Props {
  platform: Platform[];
}

const CardIcons = ({ platform }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
  };

  return (
    <HStack marginY={"10px"}>
      {platform.map((platform) => (
        <Icon
          key={platform.id}
          as={iconMap[platform.slug]}
          color={"gray.500"}
        />
      ))}
    </HStack>
  );
};

export default CardIcons;
