import React from "react";
import useGame from "../hooks/useGame";
import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GameDetailPage: React.FC = () => {
  const { gameName } = useParams();
  const { data: game, error, isLoading } = useGame(gameName!);

  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <>
      <Heading>{game.gameName}</Heading>
      <Text>{game.gameDescription}</Text>
    </>
  );
};

export default GameDetailPage;
