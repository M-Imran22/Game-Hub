import { Heading } from "@chakra-ui/react";
import EditGame from "../components/Admin/EditGame/EditGame";

const AdminEditGamePage = () => {
  return (
    <>
      <Heading as="h2" textAlign="center" fontSize="35px">
        Edit Game
      </Heading>
      <EditGame />
    </>
  );
};

export default AdminEditGamePage;
