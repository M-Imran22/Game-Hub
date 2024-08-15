import { z } from "zod";
// import ApiClient from "../../services/api-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be greater then 8 characters" })
    .max(20),
});

export type UserLoginData = z.infer<typeof schema>;

const useLogin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: async (data: UserLoginData) => {
      const response = await axios.post(
        "http://localhost:3001/api/auth",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const email = data.email;
      const password = data.password;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ email, password, roles, accessToken });
    },
    onSuccess: () => {
      navigate(from, { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export default useLogin;
