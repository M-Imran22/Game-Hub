import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../services/axios";
import AuthStore from "../../store/AuthStore";

export const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be greater than 8 characters" })
    .max(20),
});

export type UserLoginData = z.infer<typeof schema>;

const useLogin = () => {
  const { setAuth } = AuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: async (data: UserLoginData) => {
      const response = await axios.post("auth", data);
      const email = data.email;
      const password = data.password;
      const username = response?.data?.username;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles || [];

      // Set auth only if the user has the "user" role
      if (roles.includes("user")) {
        setAuth({ email, password, username, roles, accessToken });
      } else {
        throw new Error("Unauthorized");
      }
    },
    onSuccess: () => {
      navigate(from, { replace: true });
    },
    onError: (error) => {
      if (error.message === "Unauthorized") {
        navigate("/unauthorized?role=admin", { replace: true });
      } else {
        console.error("Login failed:", error.message);
      }
    },
  });
};

export default useLogin;
