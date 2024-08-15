import { z } from "zod";
// import ApiClient from "../../services/api-client";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";

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
  roles: z.string(),
});

export type UserData = z.infer<typeof schema>;
const apiClient = new ApiClient<UserData>("/register");

const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: UserData) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("roles", "user");

      await apiClient.postSignup(data);
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
