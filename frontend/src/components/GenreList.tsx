import { Button, HStack, List, ListItem, Spinner } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import { Genre } from "../hooks/useGenre";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { genres, isLoading, error } = useGenre();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Button
              fontWeight={genre.id == selectedGenre?.id ? "bold" : "normal"}
              onClick={() => onSelectGenre(genre)}
              variant="link"
              fontSize="large"
            >
              {genre.genreName}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
