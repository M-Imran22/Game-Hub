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
import useAdminSignup, { schema, AdminData } from "./useAdminSignup";
import { useState } from "react";
import { isAxiosError } from "axios";

const AdminSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminData>({ resolver: zodResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useAdminSignup();

  const submit = (data: AdminData) => {
    mutation.mutate(data, {
      onError: (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 400) {
            setErrorMessage("Unauthorized. Please check your credentials.");
          } else if (status === 409) {
            setErrorMessage("User already have an account");
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
        Signup
      </Heading>
      {errorMessage && (
        <Text color="red.500" mb={4} textAlign="center">
          {errorMessage}
        </Text>
      )}
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
        <Input {...register("roles")} type="hidden" value="admin" />
        <Button mt={6} colorScheme="teal" type="submit">
          Signup
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link
          as={RouterLink}
          to="/admin/login"
          color="teal.500"
          fontWeight="bold"
        >
          Login here
        </Link>
      </Text>
    </Box>
  );
};

export default AdminSignup;
