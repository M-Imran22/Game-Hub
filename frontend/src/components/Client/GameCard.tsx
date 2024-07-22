import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react";
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
        <Stack marginBottom={3}>
          <CardIcons platform={game.platform.map((platfrom) => platfrom)} />
        </Stack>
        <Heading fontWeight="bold" fontSize="xl">
          {game.gameName}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
