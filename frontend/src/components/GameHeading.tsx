import { GameQuery } from "../App";
import { Heading } from "@chakra-ui/react";

interface Props {
  gameQuery: GameQuery;
}
const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.platform?.slug || ""} ${
    gameQuery.genre?.genreName || ""
  } Games`;
  return (
    <Heading marginBottom={5} fontSize="5xl" as="h1">
      {heading}
    </Heading>
  );
};

export default GameHeading;
