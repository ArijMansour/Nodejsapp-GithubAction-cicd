import axios from "axios";
import { API_URL } from "./ApiUrl";

import authHeader, { pictureHeader } from "./AuthentificationHeader";
import Cookies from "js-cookie";

class UserService {
  async updateProfile(username, email, dateBirth, gender, phoneNumber, Avatar) {
    let bodyFormData = new FormData();

    let json = {
      username,
      email,
      dateBirth,
      gender,
      phoneNumber,
      Avatar,
    }; // bch nhel stackoverfloow al pc ta3i bch pc ta3k yek7alich ani 3lmtik bch ken lkit pc mayt7rikch wala 7aj

    bodyFormData.append("userName", username);
    bodyFormData.append("email", email);
    bodyFormData.append("newUsername", username);
    bodyFormData.append("gender", gender);
    bodyFormData.append("dateBirth", dateBirth);
    bodyFormData.append("phoneNumber", phoneNumber);
    bodyFormData.append("Avatar", "xxxxx");

    const response = await axios({
      method: "put",
      url: API_URL + "User/updateProfile",
      data: bodyFormData,
      headers: authHeader(bodyFormData),
    });

    return response;
  }

  updatePassword(currentPassword, password, email) {
    return axios.put(`${API_URL}/user/updatePassword`, {
      currentPassword,
      password,
      email,
    });
  }

  updatePicture(formdata, id) {
    return axios.put(
      `${API_URL}/user/updateProfilePicture/${id}`,
      formdata,

      { headers: authHeader(formdata) }
    );
  }

  GetUserByEmail(email) {
    return axios.get(API_URL + `User/getUserByEmail/${email}`);
  }

  GetPharmacies() {
    return axios.get(`${API_URL}/user/getAllPharmacies`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });
  }
}
export default new UserService();
// import axios from 'axios';
// import authHeader from './AuthentificationHeader';
// const API_URL = 'http://localhost:8080/api/test/';
// class UserService {
//   getPublicContent() {
//     return axios.get(API_URL + 'all');
//   }
//   getUserBoard() {
//     return axios.get(API_URL + 'user', { headers: authHeader() });
//   }
//   getModeratorBoard() {
//     return axios.get(API_URL + 'od', { headers: authHeader() });
//   }
//   getAdminBoard() {
//     return axios.get(API_URL + 'admin', { headers: authHeader() });
//   }
// }
