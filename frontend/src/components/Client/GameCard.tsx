import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react";
import CardIcons from "./CardIcons";
import { Link } from "react-router-dom";
import Game from "../../entities/Game";

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
          <CardIcons platform={game.platforms.map((platfrom) => platfrom)} />
        </Stack>
        <Heading fontWeight="bold" fontSize="xl">
          <Link to={"/games/" + game.gameName}>{game.gameName}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
