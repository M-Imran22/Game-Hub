import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

export const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be at most 20 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be at most 20 characters long." }),
  roles: z.string().default("user"),
});

export type UserData = z.infer<typeof schema>;

const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: UserData) => {
      await axios.post("register", data);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export default useSignup;
