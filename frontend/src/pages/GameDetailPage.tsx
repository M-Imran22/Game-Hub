import React from "react";
import useGame from "../hooks/useGame";
import { GridItem, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpendableText from "../components/Client/ExpendableText";
import GameAttributes from "../components/Client/GameAttributes";
import GameScreenShots from "../components/Client/GameScreenShots";

const GameDetailPage: React.FC = () => {
  const { gameName } = useParams();
  const { data: game, error, isLoading } = useGame(gameName!);

  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <Heading>{game.gameName}</Heading>
        <ExpendableText>{game.gameDescription}</ExpendableText>
        <GameAttributes game={game} />
      </GridItem>
      <GridItem>
        <GameScreenShots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
