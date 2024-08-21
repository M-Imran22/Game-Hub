import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  VStack,
  Text,
  Image,
  IconButton,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import genres from "../../../data/genres";
import platforms from "../../../data/platforms";
import { GameData, schema } from "../newGame/NewGameValidationSchema";
import useEditGame from "./useEditGame";
import Platform from "../../../entities/Platform";
import Genre from "../../../entities/Genre";
import ScreenShots from "../../../entities/ScreenShots";

const EditGame = () => {
  const { id } = useParams(); // Get game ID from URL
  const navigate = useNavigate();

  const methods = useForm<GameData>({ resolver: zodResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = methods;

  const screenshots = watch("screenshots", []);
  const gameImage = watch("gameImage", []);

  const { game, isLoading, isError } = useEditGame(id, reset);

  useEffect(() => {
    if (game) {
      const formattedReleaseDate = game.releaseDate.split(" ")[0]; // Format the date
      const screenshots = game.screenshots || [];

      // Extract platform slugs and genre slugs from the fetched data
      const selectedPlatforms = platforms.filter((platform) =>
        game.platforms.map((p: Platform) => p.slug).includes(platform.slug)
      );
      const selectedGenres = genres.filter((genre) =>
        game.genres.map((g: Genre) => g.slug).includes(genre.slug)
      );

      reset({
        ...game,
        releaseDate: formattedReleaseDate,
        platform: selectedPlatforms.map((p) => p.slug),
        genre: selectedGenres.map((g) => g.slug),
        screenshots,
      });
    }
  }, [game, reset]);

  //  useEffect(() => {
  //       return () => {
  //         screenshots.forEach((file:File) => {
  //           if ( file instanceof File) {
  //             URL.revokeObjectURL(file);
  //           }
  //         });
  //       };
  //     }, [screenshots]);

  const mutation = useEditGame(id, () => {
    navigate("/admin/allproducts");
  });

  const submit = (data: GameData) => {
    console.log(errors);
    console.log(data);
    mutation.mutation.mutate(data);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue("gameImage", [files[0]], { shouldValidate: true }); // Store as an array with one file
    }
  };

  const handleMultipleFileChange = (files: File[]) => {
    setValue("screenshots", [...screenshots, ...files], {
      shouldValidate: true,
    });
  };

  const imageUrl =
    gameImage.length > 0
      ? gameImage[0] instanceof File
        ? URL.createObjectURL(gameImage[0])
        : `http://localhost:3001/uploads/${gameImage}` // Existing image URL
      : null;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading game data</p>;

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt={5}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <VStack>
            <Box width="100%">
              <HStack>
                <FormControl isInvalid={!!errors.gameName} width="250%">
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

                <FormControl isInvalid={!!errors.gameImage} ms={20}>
                  <FormLabel htmlFor="gameImage">Game Cover Image</FormLabel>
                  <Box position="relative" width="150px" height="150px">
                    <Input
                      id="gameImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />
                    {gameImage.length === 0 ? (
                      <Box
                        width="150px"
                        height="150px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px dashed #CBD5E0"
                        borderRadius="md"
                        cursor="pointer"
                      >
                        <BsPlus size="24px" />
                      </Box>
                    ) : (
                      <Image
                        src={imageUrl ?? ""}
                        alt="Game Image"
                        width="150px"
                        height="150px"
                        objectFit="cover"
                        borderRadius="md"
                        // display={imageUrl ? "block" : "none"}
                      />
                    )}
                  </Box>
                  <FormErrorMessage>
                    {errors.gameImage?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
            </Box>
            <Box width="100%">
              <HStack>
                <FormControl isInvalid={!!errors.publisherName}>
                  <FormLabel htmlFor="publisherName">Publisher Name</FormLabel>
                  <Input
                    {...register("publisherName")}
                    id="publisherName"
                    placeholder="Enter the publisher name"
                  />
                  <FormErrorMessage>
                    {errors.publisherName && errors.publisherName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.releaseDate}>
                  <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
                  <Input
                    {...register("releaseDate")}
                    id="releaseDate"
                    type={"date"}
                  />
                  <FormErrorMessage>
                    {errors.releaseDate && errors.releaseDate.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
            </Box>
            <Box width="100%">
              <HStack>
                <FormControl isInvalid={!!errors.price}>
                  <FormLabel htmlFor="price">Game Price</FormLabel>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    id="price"
                    type={"number"}
                    placeholder="Enter the game price"
                  />
                  <FormErrorMessage>
                    {errors.price && errors.price.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.salePrice}>
                  <FormLabel htmlFor="salePrice">Sale Price</FormLabel>
                  <Input
                    {...register("salePrice", { valueAsNumber: true })}
                    id="salePrice"
                    type={"number"}
                  />
                  <FormErrorMessage>
                    {errors.salePrice && errors.salePrice.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
            </Box>

            <Box width="100%">
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
            </Box>
            <Box width="100%">
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
            </Box>
            <Box>
              <Controller
                name="screenshots"
                control={control}
                defaultValue={[]}
                render={({ field: {} }) => (
                  <Box>
                    <Text fontWeight="bold" my={5}>
                      Upload ScreenShots
                    </Text>
                    <IconButton
                      aria-label="Upload screenshots"
                      icon={<BsPlus />}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.multiple = true;
                        input.onchange = (e) => {
                          const files = Array.from(
                            (e.target as HTMLInputElement).files || []
                          );
                          handleMultipleFileChange(files);
                        };
                        input.click();
                      }}
                      isRound
                      size="lg"
                    />
                    {errors.screenshots && (
                      <Box color="red.500">{errors.screenshots.message}</Box>
                    )}
                  </Box>
                )}
              />

              {screenshots.length > 0 && (
                <SimpleGrid columns={[2, null, 3]} spacing={4} mt={5}>
                  {screenshots.map((file, index) => (
                    <Image
                      key={index}
                      src={
                        file instanceof File
                          ? URL.createObjectURL(file)
                          : `http://localhost:3001/uploads/${
                              (file as ScreenShots).screenShot
                            }`
                      }
                      alt={`uploaded image ${index + 1}`}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  ))}
                </SimpleGrid>
              )}
            </Box>
            <Box width="100%">
              <FormControl isInvalid={!!errors.gameDescription}>
                <FormLabel htmlFor="gameDescription">
                  Game Description
                </FormLabel>
                <Textarea
                  rows={10}
                  cols={20}
                  {...register("gameDescription")}
                  id="gameDescription"
                />
                <FormErrorMessage>
                  {errors.gameDescription && errors.gameDescription.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Button type="submit" size={"md"}>
              Edit
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default EditGame;
