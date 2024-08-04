import { z } from "zod";
// import ApiClient from "../../services/api-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const schema = z.object({
  username: z
    .string()
    .min(3, { message: "name must be greater then 3 characters" })
    .max(20),
  password: z
    .string()
    .min(8, { message: "Password must be greater then 8 characters" })
    .max(20),
});

export type UserLoginData = z.infer<typeof schema>;

const useLogin = () => {
  return useMutation({
    mutationFn: async (data: UserLoginData) => {
      await axios
        .post("http://localhost:3001/api/admin/login", data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      console.log("admin Loggedin");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export default useLogin;
