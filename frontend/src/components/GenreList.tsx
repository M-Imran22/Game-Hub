import { Button, HStack, List, ListItem, Spinner } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import { Genre } from "../hooks/useGenre";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
  const { genres, isLoading, error } = useGenre();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Button
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
