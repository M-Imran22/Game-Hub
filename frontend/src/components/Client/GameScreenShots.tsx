import { Image, SimpleGrid } from "@chakra-ui/react";
import useScreenShots from "../../hooks/useScreenShots";

interface Props {
  gameId: number;
}
const GameScreenShots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useScreenShots(gameId);

  if (isLoading) return null;

  if (error) throw error;
  if (data)
    return (
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        {data.map((shot) => (
          <Image
            key={shot.id}
            src={`http://localhost:3001/uploads/${shot.screenShot}`}
          />
        ))}
      </SimpleGrid>
    );
};

export default GameScreenShots;
