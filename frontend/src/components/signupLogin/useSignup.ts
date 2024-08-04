import { z } from "zod";
// import ApiClient from "../../services/api-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const schema = z.object({
  username: z
    .string()
    .min(3, { message: "name must be greater then 3 characters" })
    .max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be greater then 8 characters" })
    .max(20),
});

export type UserData = z.infer<typeof schema>;
// const apiClient = new ApiClient<UserData>("/admin/signup");

const useSignup = () => {
  return useMutation({
    mutationFn: async (data: UserData) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      console.log(data);

      await axios
        .post("http://localhost:3001/api/admin/signup", data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      console.log("admin data is saved");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export default useSignup;
