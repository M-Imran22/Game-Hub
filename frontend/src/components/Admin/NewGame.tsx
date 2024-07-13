import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import apiClient from "../../services/api-client";
import genres from "../../data/genres";
import platforms from "../../data/platforms";

// const platforms = [
//   { id: 1, name: "Playstation", slug: "playstation" },
//   { id: 2, name: "PC", slug: "pc" },
//   { id: 3, name: "Xbox", slug: "xbox" },
//   { id: 4, name: "Nintendo", slug: "nintendo" },
// ];

const schema = z.object({
  gameName: z.string().min(3, "Name is required"),
  gameImage: z
    .any()
    .refine((file) => file?.length === 1, "Image is required")
    .refine(
      (file) => file && file[0].type.startsWith("image/"),
      "Must be an image"
    ),
  platform: z.array(z.string()).nonempty("Select at least one platform"),
  genre: z.array(z.string()).nonempty("Select at least one genre"),
});

type GameData = z.infer<typeof schema>;

const NewGame = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<GameData>({ resolver: zodResolver(schema) });

  const submit = async (data: GameData) => {
    const gameData = new FormData(); //FormData is a built-in object
    gameData.append("gameName", data.gameName);
    gameData.append("gameImage", data.gameImage[0]);
    gameData.append("platform", JSON.stringify(data.platform));

    const selectedGenres = genres.filter((genre) =>
      data.genre.includes(genre.slug)
    );
    gameData.append("genre", JSON.stringify(selectedGenres));

    try {
      const response = await apiClient.post("/games", gameData, {
        headers: {
          "Content-Type": "muultipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("gameImage", event.target.files);
  };
  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={5}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit(submit)}>
        <VStack>
          <FormControl isInvalid={!!errors.gameName}>
            <FormLabel htmlFor="gameName">Game Name</FormLabel>
            <Input
              {...register("gameName")}
              id="gameName"
              placeholder="Enter the game name"
            />
            <FormErrorMessage>
              {errors.gameName && errors.gameName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.gameImage}>
            <FormLabel htmlFor="gameImage">Game Image</FormLabel>
            <Input
              id="gameImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <FormErrorMessage>
              {errors.gameImage?.message as string}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.platform}>
            <FormLabel htmlFor="platforms">Select Platforms</FormLabel>
            <Stack>
              {platforms.map((platform) => (
                <Checkbox
                  {...register("platform")}
                  key={platform.id}
                  value={platform.slug}
                >
                  {platform.name}
                </Checkbox>
              ))}
            </Stack>
            <FormErrorMessage>
              {errors.platform?.message as string}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.genre}>
            <FormLabel htmlFor="genres">Select Genres</FormLabel>
            <Box display="flex" flexWrap="wrap" gap={4}>
              {genres.map((genre) => (
                <Box key={genre.id} width="calc(33.33% - 16px)">
                  <Checkbox
                    {...register("genre")}
                    key={genre.id}
                    value={genre.slug}
                  >
                    {genre.genreName}
                  </Checkbox>
                </Box>
              ))}
            </Box>
            <FormErrorMessage>
              {errors.genre?.message as string}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" size={"md"}>
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default NewGame;
