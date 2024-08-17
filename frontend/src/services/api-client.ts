import { AxiosRequestConfig, AxiosInstance } from "axios";
// import useAxiosPrivate from "../hooks/useAxiosPrivate"; // Assuming the path is correct

class ApiClient<T> {
  endpoint: string;
  axiosPrivateInstance: AxiosInstance;

  constructor(endpoint: string, axiosPrivateInstance: any) {
    this.endpoint = endpoint;
    this.axiosPrivateInstance = axiosPrivateInstance;
  }

  getAll = (config: AxiosRequestConfig) => {
    return this.axiosPrivateInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return this.axiosPrivateInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("API request failed:", error);
        throw error;
      });
  };

  delete = async (id: number | string): Promise<{ message: string }> => {
    try {
      const response = await this.axiosPrivateInstance.delete<{
        message: string;
      }>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("API delete request failed:", error);
      throw error;
    }
  };

  getAllPaginated = (config: AxiosRequestConfig) => {
    return this.axiosPrivateInstance
      .get<{ games: T[]; total: number; pages: number; currentPage: number }>(
        this.endpoint,
        config
      )
      .then((res) => res.data);
  };

  postNewGame = async (data: T) => {
    const res = await this.axiosPrivateInstance.post(this.endpoint, data);
    return res.data;
  };

  postSignup = async (data: T) => {
    await this.axiosPrivateInstance
      .post(this.endpoint, data)
      .then((res) => res.data);
  };
}

export default ApiClient;
