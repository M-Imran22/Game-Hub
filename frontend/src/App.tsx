import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import NewGame from "./components/Admin/NewGame";
import GamesList from "./components/GamesList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "asid main"`,
      }}
    >
      <GridItem area={"nav"}>
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"asid"}>Aside</GridItem>
      </Show>
      <GridItem area={"main"}>
        {/* <NewGame /> */}
        <GamesList />
      </GridItem>
    </Grid>
  );
}

export default App;
