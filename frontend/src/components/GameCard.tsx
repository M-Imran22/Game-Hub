import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { Game } from "../hooks/useGame";
import CardIcons from "./CardIcons";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const ImageUrl = `http://localhost:3001/uploads/${game.gameImage}`;
  console.log(game.platform);

  return (
    <Card width="300px" borderRadius="10px" overflow={"hidden"}>
      <Image
        src={ImageUrl}
        alt={game.gameName}
        height={"300px"}
        objectFit="fill"
      />
      <CardBody>
        <Heading fontWeight="bold" fontSize="xl">
          {game.gameName}
        </Heading>
        <CardIcons platform={game.platform.map((platfrom) => platfrom)} />
      </CardBody>
    </Card>
  );
};

export default GameCard;
