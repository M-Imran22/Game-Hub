import { SimpleGrid, Text } from "@chakra-ui/react";
import Game from "../../entities/Game";
import DefinitionItem from "./DefinitionItem";

interface Props {
  game: Game;
}
const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl">
      <DefinitionItem term="Platforms">
        {game.platforms.map((p) => (
          <Text key={p.id}>{p.slug}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres.map((g) => (
          <Text key={g.id}>{g.slug}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publisher Name">
        {game.publisherName}
      </DefinitionItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
