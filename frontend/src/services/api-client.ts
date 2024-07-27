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

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data) // Ensure the data is returned here
      .catch((error) => {
        // Handle or log errors
        console.error("API request failed:", error);
        throw error; // Rethrow the error after logging
      });
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
