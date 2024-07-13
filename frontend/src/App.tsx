import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GamesList from "./components/GamesList";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenre";
import PlatformSelecter from "./components/PlatformSelecter";
import { Platform } from "./hooks/usePlatforms";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  onSearch: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "asid main"`,
      }}
      templateColumns={{
        base: " 1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <Navbar
          onSearch={(onSearch) => setGameQuery({ ...gameQuery, onSearch })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area={"asid"} paddingX={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        {/* <NewGame /> */}
        <Box marginLeft={3}>
          <GameHeading gameQuery={gameQuery} />
          <PlatformSelecter
            selectedPlatform={gameQuery.platform}
            onSelectPlatform={(platform) =>
              setGameQuery({ ...gameQuery, platform })
            }
          />
        </Box>
        <GamesList gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
