import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const APIToken = axios.create({ baseURL: "http://localhost:5000" });

APIToken.interceptors.request.use((req) => {
  req.headers.Authorization = `${Cookies.get("token")}`;

  return req;
});

export const getUser = (userId) =>
  APIToken.get(`/api/v1/user/getUser/${userId}`);

export const getPharmacies = () =>
  APIToken.get(`/api/v1/user/getAllPharmacies/`);

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
