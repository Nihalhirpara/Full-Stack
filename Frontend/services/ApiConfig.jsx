// import axios from "axios";
// import { BASE_URL } from "../constants";
// // import AxiosWrapper from "../services/ApiConfig.jsx";

// export default class AxiosWrapper {
//   static token = null;
//   constructor() {
//     //Axios wrapper retrive token
//   }
//   static retriveToken = async () => {
//     try {
//       this.token = await localStorage.getItem("token");
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   static post = async ({ endpoint, body }) => {
//     // await AxiosWrapper.retriveToken();
//     return axios.post(`${BASE_URL}/${endpoint}`, body, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   };

//   static get = async ({ endpoint, page, limit = 10, search }) => {
//     await AxiosWrapper.retrieveToken();

//     let url = `${BASE_URL}${endpoint}`;
//     const searchParams = [];
//     let params;

//     if (search) {
//       searchParams.push(`title=${search}`);
//     }

//     if (page) {
//       searchParams.push(`page=${page}&limit=${limit}`);
//     }

//     if (searchParams.length > 0) {
//       params = searchParams.join("&");
//       url = `${url}?${params}`;
//     }

//     return axios.get(url, {
//       headers: {
//         Authorization: `${this.token}`,
//       },
//     });
//   };
// }

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default class AxiosWrapper {
  static token = null;
  constructor() {}
  static retrivetoken = async () => {
    try {
      this.token = await localStorage.getItem("token");
    } catch (e) {
      console.error(e);
    }
  };

  static post = async ({ endpoint, body }) => {
    if (!BASE_URL) console.error("❌ BASE_URL is undefined!");
    if (!endpoint) console.error("❌ endpoint is undefined!");

    return axios.post(`${BASE_URL}/${endpoint}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
