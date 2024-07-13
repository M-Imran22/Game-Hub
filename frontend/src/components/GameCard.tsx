import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGame";
import CardIcons from "./CardIcons";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const ImageUrl = `http://localhost:3001/uploads/${game.gameImage}`;

  return (
    <Card>
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
