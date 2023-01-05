import Cookie from "js-cookie";

export const API_URL = "http://localhost:5000/api/v1";

export const authToken = {
  Authorization: `${Cookie.get("token")}`,
};
