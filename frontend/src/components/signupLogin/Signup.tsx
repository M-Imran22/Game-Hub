import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignup, { schema, UserData } from "./useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const mutation = useSignup();

  const submit = (data: UserData) => {
    mutation.mutate(data);
    navigate("/admin");
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
    >
      <Heading as="h1" fontSize="32px" my={8} textAlign="center">
        Signup for Admin Portal
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl>
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
        <Button mt={5} type="submit">
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
