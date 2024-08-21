import axios from "axios";
import AuthStore from "../store/AuthStore";

interface Auth {
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAuth } = AuthStore();

  const refresh = async () => {
    const response = await axios.get("http://localhost:3001/api/refresh", {
      withCredentials: true,
    });

    setAuth((prev: Auth) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
