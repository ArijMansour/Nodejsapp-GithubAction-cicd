import axios from "axios";
import { authenticate } from "../../../_helper/auth";
import { API_URL, authToken } from "./ApiUrl";
import Cookies from "js-cookie";

class CategoryService {
  getCategories = async () => {
    const re = await axios.get(`${API_URL}/categories`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

    return re;
  };

  getCategory = async (id) =>
    await axios.get(`${API_URL}/category/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  removeCategory = async (id) =>
    await axios.delete(`${API_URL}/category/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  updateCategory = async (id, category) =>
    await axios.put(`${API_URL}/category/${id}`, category, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  createCategory = async (category) =>
    await axios.post(`${API_URL}/category`, category, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  searhCategory = async (value) =>
    await axios.get(`${API_URL}/searchCategory?name=${value}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });
}
export default new CategoryService();
