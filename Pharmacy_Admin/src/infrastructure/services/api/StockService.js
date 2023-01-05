import axios from "axios";
import { authenticate } from "../../../_helper/auth";
import { API_URL, authToken } from "./ApiUrl";
import Cookies from "js-cookie";

class StockService {
  getStocks = async () =>
    await axios.get(`${API_URL}/stock/getStocks`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  myStock = async () =>
    await axios.get(`${API_URL}/stock/getStocks`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  removeStock = async (id) =>
    await axios.delete(`${API_URL}/stock/delete/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  updateStock = async (id, Stock) =>
    await axios.put(`${API_URL}/stock/${id}`, Stock, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

  createStock = async (Stock) =>
    await axios.post(`${API_URL}/stock/addStock`, Stock, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
}
export default new StockService();
