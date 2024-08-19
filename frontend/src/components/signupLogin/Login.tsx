import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
  Input,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useLogin, { schema, UserLoginData } from "./useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({ resolver: zodResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useLogin();

  const submit = (data: UserLoginData) => {
    mutation.mutate(data, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 400) {
            setErrorMessage("Unauthorized. Please check your credentials.");
          } else if (status === 401) {
            setErrorMessage("Invalid email or password. Please try again.");
          } else if (status === 500) {
            setErrorMessage("Server error. Please try again later.");
          } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
          }
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      },
    });
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
        Login
      </Heading>
      {errorMessage && (
        <Text color="red.500" mb={4} textAlign="center">
          {errorMessage}
        </Text>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <FormControl>
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
        <FormControl>
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
        <Button mt={6} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account?{" "}
        <Link as={RouterLink} to="/signup" color="teal.500" fontWeight="bold">
          Signup here
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
