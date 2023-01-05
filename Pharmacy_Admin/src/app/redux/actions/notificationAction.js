import axios from "axios";

export const apiNotification = {
  async getNotification(id) {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/notification/${id}`
    );

    return data;
  },

  async getNotificationPharmacy(id) {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/notification/get/${id}`
    );
    return data;
  },
  async addNotification(notif) {
    const { data } = await axios.post(
      `http://localhost:5000/api/v1/notification/add`,
      notif
    );
    console.log("DATATATA==" + JSON.stringify(data));
    return data;
  },

  async putNotification(id) {
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/notification/update/${id}`
    );
    return data;
  },
  async deleteNotification(id) {
    const { data } = await axios.delete(
      `http://localhost:5000/api/v1/notification/delete/${id}`
    );
    return data;
  },
  async getAdminNotification(id) {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/notification/notificationsAdmin/${id}`
    );

    return data;
  },
};
