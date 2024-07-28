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
import { ChangeEvent } from "react";
import genres from "../../../data/genres";
import platforms from "../../../data/platforms";
import useNewGame from "../../../hooks/useNewGame";
import { GameData, schema } from "./NewGameValidationSchema";
import { useNavigate } from "react-router-dom";
// import { fetchOptions } from "./services/api-client";

const NewGame = () => {
  // const { data: options } = useQuery({
  //   queryKey: ["options"],
  //   queryFn: () => fetchOptions(),
  // });

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

  const screenShots = watch("screenShots", []);
  const gameImage = watch("gameImage", []);

  const navigate = useNavigate();

  const mutation = useNewGame(() => {
    reset();
    navigate("/admin");
  });

  const submit = (data: GameData) => {
    // console.log(data);
    mutation.mutate(data);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("gameImage", event.target.files);
  };

  const handleMultipleFileChange = (files: File[]) => {
    setValue("screenShots", [...screenShots, ...files], {
      shouldValidate: true,
    });
  };

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
                        src={URL.createObjectURL(gameImage[0])}
                        alt="Game Image"
                        width="150px"
                        height="150px"
                        objectFit="cover"
                        borderRadius="md"
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
                  <FormLabel htmlFor="releaseDate">release Date</FormLabel>
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
                name="screenShots"
                control={control}
                defaultValue={[]}
                render={({ field: {} }) => (
                  <Box>
                    <Text fontWeight="bold" my={5}>
                      Upload ScreenShots
                    </Text>
                    <IconButton
                      aria-label="Upload screenShots"
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
                    {errors.screenShots && (
                      <Box color="red.500">{errors.screenShots.message}</Box>
                    )}
                  </Box>
                )}
              />

              {screenShots.length > 0 && (
                <SimpleGrid columns={[2, null, 3]} spacing={4} mt={5}>
                  {screenShots.map((file, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(file)}
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
              <FormControl isInvalid={!!errors.gameDiscription}>
                <FormLabel htmlFor="gameDiscription">
                  Game Discription
                </FormLabel>
                <Textarea
                  rows={10}
                  cols={20}
                  {...register("gameDiscription")}
                  id="gameDiscription"
                />
                <FormErrorMessage>
                  {errors.gameDiscription && errors.gameDiscription.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            {/* <Box width="100%" my={5}>
              <Text fontWeight="bold" my={5}>
                System Requirements
              </Text>
              <HStack spacing={4}>
              <Box>
                  <Text>RECOMMENDED:</Text>
                  <VStack spacing={4}>
                    {Object.keys(options || {}).map((key) => {
                      const typedKey = key as TypesKeys;
                      return (
                        <FormControl key={typedKey}>
                          <FormLabel>{typedKey}</FormLabel>
                          <Select
                            {...register(
                              `systemRequirements.recommended.${typedKey}`
                            )}
                            placeholder={`Select ${typedKey}`}
                          >
                            {options?.[typedKey]?.[0]?.options?.map(
                              (option) => (
                                <option key={option.id} value={option.value}>
                                  {option.value}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                      );
                    })}
                  </VStack>
                </Box>
                <Box>
                  <Text>MINIMUM:</Text>
                  <VStack spacing={4}>
                    {Object.keys(options || {}).map((key) => {
                      const typedKey = key as TypesKeys;
                      return (
                        <FormControl key={typedKey}>
                          <FormLabel>{typedKey}</FormLabel>
                          <Select
                            {...register(
                              `systemRequirements.minimum.${typedKey}`
                            )}
                            placeholder={`Select ${typedKey}`}
                          >
                            {options?.[typedKey]?.[0]?.options?.map(
                              (option) => (
                                <option key={option.id} value={option.value}>
                                  {option.value}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                      );
                    })}
                  </VStack>
                </Box>
              </HStack>
            </Box> */}
            <Button type="submit" size={"md"}>
              Submit
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default NewGame;
