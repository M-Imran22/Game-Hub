import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GamesList = ({ gameQuery }: Props) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGame(gameQuery);

  const filteredGames = data?.pages.flatMap((page) =>
    page.games.filter((game) => {
      const matchesGenre = gameQuery.genre
        ? game.genre.some(
            (genre) => genre.genreName === gameQuery.genre?.genreName
          )
        : true;
      const matchesPlatform = gameQuery.platform
        ? game.platform.some(
            (platform) => platform.slug === gameQuery.platform?.slug
          )
        : true;
      return matchesGenre && matchesPlatform;
    })
  );

  let allGames = filteredGames;
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error.message}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        padding={"10px"}
        spacing={5}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              {" "}
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {}
        {allGames?.map((game) => (
          <GameCardContainer key={game.id}>
            {" "}
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </>
  );
};

export default GamesList;
