import axios from "axios";
import { authenticate } from "../../../_helper/auth";
import { API_URL, authToken } from "./ApiUrl";
import Cookies from "js-cookie";

class PrescriptionService {
  getPrescriptions = async () =>
    await axios.get(`${API_URL}/prescription/prescriptions`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  myPrescription = async () =>
    await axios.get(`${API_URL}/prescription/myprescription`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  removePrescription = async (id) =>
    await axios.delete(`${API_URL}/prescription/delete/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  updatePrescription = async (id, Prescription) =>
    await axios.put(`${API_URL}/prescription/${id}`, Prescription, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  createPrescription = async (Prescription) =>
    await axios.post(`${API_URL}/prescription/add`, Prescription, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
}
export default new PrescriptionService();
