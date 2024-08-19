import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import useSignup, { schema, UserData } from "./useSignup";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: zodResolver(schema) });

  const mutation = useSignup();

  const submit = (data: UserData) => {
    mutation.mutate(data);
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={5}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      backdropFilter="blur(10px)"
    >
      <Heading as="h1" fontSize="32px" my={8} textAlign="center">
        Signup
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            {...register("username")}
            type="text"
            placeholder="Enter your username"
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email} mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password here..."
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Input {...register("roles")} type="hidden" value="user" />
        <Button mt={6} colorScheme="teal" type="submit">
          Signup
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link as={RouterLink} to="/login" color="teal.500" fontWeight="bold">
          Login here
        </Link>
      </Text>
    </Box>
  );
};

export default Signup;
