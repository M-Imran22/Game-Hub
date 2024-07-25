// import axios from "axios";
// import { Category, Types } from "../interface";

// export const fetchOptions = async (): Promise<Types> => {
//   const response = await axios.get<Category[]>(
//     "http://localhost:3001/api/sys_req_options"
//   );
//   // Transform the API response into the Types structure
//   const categories = response.data;

//   const types: Types = {
//     OS: categories.filter((category) => category.name === "OS"),
//     processer: categories.filter((category) => category.name === "Processor"),
//     memory: categories.filter((category) => category.name === "Memory"),
//     graphics: categories.filter((category) => category.name === "Graphics"),
//     storage: categories.filter((category) => category.name === "Storage"),
//   };

//   return types;
// };

// // export const fetchOptions = async () => {
// //   const response = await axios.get<Types[]>(
// //     "http://localhost:3001/api/sys_req_options"
// //   );
// //   return response.data;
// // };
