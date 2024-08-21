import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useDeleteGame from "./useDeleteGame";
import useAllGames from "./useAllGames";
import { Link } from "react-router-dom";

const AllGameProduct = () => {
  const [page, setPage] = useState<number>(1);

  const { data: games, error, isLoading } = useAllGames(page);

  const { mutate: deleteGame } = useDeleteGame();

  const handleDelete = (id: number) => {
    deleteGame(id, {
      onSuccess: () => {
        window.alert(`Game No ${id} deleted`);
        console.log(`Game with id: ${id} deleted successfully`);
      },
      onError: (error) => {
        console.error(`Failed to delete game with id: ${id}`, error);
      },
    });
  };

  const handleNextPage = () => {
    if (games?.length === 10) setPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Publisher</Th>
            <Th>Price</Th>
            <Th>Release Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {games?.map((game) => (
            <Tr key={game.id}>
              <Td>
                <Link to={`/admin/${game.id}/edit`}>{game.id}</Link>
              </Td>
              <Td>
                <img
                  width="150px"
                  height="150px"
                  src={`http://localhost:3001/uploads/${game.gameImage}`}
                  alt={game.gameName}
                />
              </Td>
              <Td>
                <Link to={`/admin/${game.id}/edit`}>{game.gameName}</Link>
              </Td>
              <Td>{game.publisherName}</Td>
              <Td>{game.price}</Td>
              <Td>{game.releaseDate}</Td>
              <Td>
                <IconButton
                  aria-label="Delete game"
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(game.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="center" my={8}>
        <Button
          disabled={page === 1}
          mx={4}
          onClick={handlePreviousPage}
          colorScheme="teal"
        >
          Previous Page
        </Button>
        <Button mx={4} onClick={handleNextPage} colorScheme="teal">
          Next Page
        </Button>
      </Flex>
    </Box>
  );
};

export default AllGameProduct;
