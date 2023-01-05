import axios from "axios";
import { authenticate } from "../../../_helper/auth";
import { API_URL, authToken } from "./ApiUrl";
import Cookies from "js-cookie";

class MedecineService {
  getMedecines = async () =>
    await axios.get(`${API_URL}/medecines`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  getMedecine = async (id) =>
    await axios.get(`${API_URL}/medecine/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  getcategoryMedecine = async (id) =>
    await axios.get(`${API_URL}/categoryMedecine`, id);

  removeMedecine = async (id) =>
    await axios.delete(`${API_URL}/medecine/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  updateMedecine = async (id, medecine) =>
    await axios.put(`${API_URL}/medecine/${id}`, medecine, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  createMedecine = async (medecine) =>
    await axios.post(`${API_URL}/medecine`, medecine, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

  searchMedecine = async (value) =>
    await axios.get(`${API_URL}/searchmedecine?name=${value}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  assignCatToProd = async (data) =>
    await axios.put(`${API_URL}/assign`, data, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });
}
export default new MedecineService();
