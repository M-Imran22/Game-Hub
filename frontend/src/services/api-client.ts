import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  getAllPaginated = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<{ games: T[]; total: number; pages: number; currentPage: number }>(
        this.endpoint,
        config
      )
      .then((res) => res.data);
  };

  postNewGame = async (data: T) => {
    const res = await axiosInstance.post(this.endpoint, data);
    return res.data;
  };
}

export default ApiClient;
