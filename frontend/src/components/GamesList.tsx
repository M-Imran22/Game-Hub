import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  gameQuery: GameQuery;
}

const GamesList = ({ gameQuery }: Props) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGame(gameQuery);

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

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.games.length, 0) || 0;

  return (
    <>
      {error && <Text>{error.message}</Text>}
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
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
      </InfiniteScroll>
    </>
  );
};

export default GamesList;
