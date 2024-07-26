import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Client/Navbar";
import GamesList from "./components/Client/GamesList";
import GenreList from "./components/Client/GenreList";
import PlatformSelecter from "./components/Client/PlatformSelecter";
import GameHeading from "./components/Client/GameHeading";

//

function App() {
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
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"asid"} paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        {/* <NewGame /> */}
        <Box marginLeft={3}>
          <GameHeading />
          <PlatformSelecter />
        </Box>
        <GamesList />
      </GridItem>
    </Grid>
  );
}

export default App;
