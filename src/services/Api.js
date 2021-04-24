import axios from "axios";

export default () => {
  const token = sessionStorage.getItem("token");
  return axios.create({
    // baseURL: process.env.BASE_URL_API,
    baseURL: "http://localhost:3000/api/",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
