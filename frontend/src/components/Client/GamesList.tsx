import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import useGameQueryStore from "../../store/gameQueryStore";

const GamesList = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();

  const filteredGames = data?.pages.flatMap((page) =>
    page.games.filter((game) => {
      const matchesGenre = gameQuery.genre
        ? game.genres.some((genre) => genre.slug === gameQuery.genre?.slug)
        : true;
      const matchesPlatform = gameQuery.platform
        ? game.platforms.some(
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
