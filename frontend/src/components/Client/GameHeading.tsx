import { Heading } from "@chakra-ui/react";
import useGameQueryStore from "../../store/gameQueryStore";

const GameHeading = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  const heading = `${gameQuery.platform?.slug || ""} ${
    gameQuery.genre?.genreName || ""
  } Games`;
  return (
    <>
      <Heading marginBottom={5} fontSize="5xl" as="h1">
        {heading}
      </Heading>
    </>
  );
};

export default GameHeading;
