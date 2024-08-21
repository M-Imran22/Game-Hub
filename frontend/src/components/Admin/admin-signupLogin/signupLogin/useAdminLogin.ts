import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../../services/axios";
import AuthStore from "../../../../store/AuthStore";

export const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type AdminLoginData = z.infer<typeof schema>;

const useAdminLogin = () => {
  const { setAuth } = AuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  return useMutation({
    mutationFn: async (data: AdminLoginData) => {
      const response = await axios.post("auth", data);
      const email = data.email;
      const password = data.password;
      const username = response?.data?.username;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles || [];

      // Check if the user has the "admin" role
      if (roles.includes("admin")) {
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
        navigate("/unauthorized?role=user", { replace: true });
      } else {
        console.error("Login failed:", error.message);
      }
    },
  });
};

export default useAdminLogin;
