import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../../../services/axios";
import AuthStore from "../../../../store/AuthStore";

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
  roles: z.string().default("admin"),
});

export type AdminData = z.infer<typeof schema>;

const useAdminSignup = () => {
  const navigate = useNavigate();
  const { setAuth } = AuthStore();

  return useMutation({
    mutationFn: async (data: AdminData) => {
      await axios.post("register", data);
    },
    onSuccess: () => {
      setAuth({});
      navigate("/admin/login");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export default useAdminSignup;
