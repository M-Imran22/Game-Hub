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
import { useNavigate } from "react-router-dom";
import useLogin, { schema, UserLoginData } from "./useLogin";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const mutation = useLogin();

  const submit = (data: UserLoginData) => {
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
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
