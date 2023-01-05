import axios from "axios";
import { authenticate } from "../../../_helper/auth";
import { API_URL } from "./ApiUrl";

class AuthService {
  login = (email, password) => {
    return axios
      .post(`${API_URL}/auth/signin`, { email, password })
      .then((res) => {
        authenticate(res, () => {});
      });
  };
  getCurrentUser(token) {
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;

    return axios.post(`${API_URL}/currentUser`).then((response) => {});
  }

  logout() {
    console.log("logout");
    Cookies.remove("token");

    localStorage.removeItem("user");
  }

  signUp(username, phone, email, password, confirm) {
    return axios.post(`${API_URL}/auth/register`, {
      username,
      phone,
      email,
      password,
      confirm,
    });
  }

  signUpPatient(
    username,
    firstName,
    lastName,
    phone,
    email,
    password,
    address,
    confirm
  ) {
    return axios.post(`${API_URL}/auth/register-patient`, {
      username,
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      confirm,
    });
  }
  forgetPassword(email) {
    return axios
      .put(`${API_URL}/auth/forgotpassword`, { email })
      .then((response) => {
        return response;
      });
  }

  activateEmail(token) {
    return axios
      .post(`${API_URL}/auth/activate`, { token })
      .then((response) => {
        // alert(JSON.stringify(response.data.errors))
        return response;
      });
  }

  activateEmailPatient(token) {
    return axios
      .post(`${API_URL}/auth/activate-patient`, { token })
      .then((response) => {
        // alert(JSON.stringify(response.data.errors))
        return response;
      });
  }

  confirmEmail(token, email) {
    return axios
      .post(API_URL / `auth/activate?token=${token}`, { email, token })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(
          "CATCH AN ERROR INSIDE AUTH_SERVICE in confirmEmail ==" +
            JSON.stringify(error)
        );
      });
  }

  resetPassword(newPassword, resetPasswordLink) {
    return axios
      .put(`${API_URL}/auth/resetpassword`, {
        newPassword,
        resetPasswordLink,
      })
      .then((response) => {
        return response;
      });
  }
}
export default new AuthService();
