import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  IconButton,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface GameProduct {
  id: number;
  gameName: string;
  gameImage: string;
  publisherName: string;
  price: number;
  releaseDate: string;
}

interface ResponseGames {
  games: GameProduct[];
}

const AllGameProduct = () => {
  const [games, setGames] = useState<GameProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ResponseGames>(
          "http://localhost:3001/api/games",
          {
            params: {
              page: page,
              page_size: 10,
            },
          }
        );
        setGames(response.data.games);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleDelete = (id: number) => {
    // handle the delete action
    console.log(`Deleting game with id: ${id}`);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
          {games.map((game) => (
            <Tr key={game.id}>
              <Td>
                <Link href={`http://localhost:3001/game/${game.id}`} isExternal>
                  {game.id}
                </Link>
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
                <Link href={`http://localhost:3001/game/${game.id}`} isExternal>
                  {game.gameName}
                </Link>
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
        <Button onClick={handlePreviousPage} colorScheme="teal">
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
