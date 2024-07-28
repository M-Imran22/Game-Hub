import { Heading } from "@chakra-ui/react";
import NewGame from "../components/Admin/newGame/NewGame";

const AdminNewGamePage = () => {
  return (
    <>
      <Heading as="h2" textAlign="center" fontSize="35px">
        Add New Game
      </Heading>
      <NewGame />
    </>
  );
};

export default AdminNewGamePage;
