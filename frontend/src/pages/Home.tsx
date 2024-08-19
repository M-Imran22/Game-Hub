import { Grid, GridItem, Show, Box } from "@chakra-ui/react";
import GameHeading from "../components/Client/GameHeading";
import GamesList from "../components/Client/GamesList";
import GenreList from "../components/Client/GenreList";
import PlatformSelecter from "../components/Client/PlatformSelecter";
import Slideshow from "../components/Client/Slideshow";

const Home = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` "asid main"`,
      }}
      templateColumns={{
        base: " 1fr",
        lg: "200px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area={"asid"} paddingX={3} paddingTop={4}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box marginLeft={3}>
          <Slideshow />
          <GameHeading />
          <PlatformSelecter />
        </Box>
        <GamesList />
      </GridItem>
    </Grid>
  );
};

export default Home;
