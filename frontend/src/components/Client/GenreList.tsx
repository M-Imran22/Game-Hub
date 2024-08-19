import {
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGenre from "../../hooks/useGenre";
import useGameQueryStore from "../../store/gameQueryStore";

const GenreList = () => {
  const setGenre = useGameQueryStore((s) => s.setGenre);
  const selectedGenre = useGameQueryStore((s) => s.gameQuery.genre);
  const { data, isLoading, error } = useGenre();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <>
      {" "}
      <Heading fontSize="2xl" marginBottom={5}>
        Genres
      </Heading>
      <List>
        {data?.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id == selectedGenre?.id ? "bold" : "normal"}
                onClick={() => setGenre(genre)}
                variant="link"
                fontSize="large"
              >
                {genre.genreName}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
