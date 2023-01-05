import { createSlice } from "@reduxjs/toolkit";
import { apiNotification } from "../actions/notificationAction";

let initialState = {
  notifications: [],
  errors: "",
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    addNotifications: (state, action) => {
      const payload = action.payload;
      state.notifications.push(payload);
    },
  },
});

export const fetchNotifications = (id) => async (dispatch) => {
  const res = apiNotification.getNotification(id);

  res.then((data) => {
    console.log("data===" + JSON.stringify(data));
    dispatch(setNotifications(data));
  });
};

export const fetchNotificationsPharmacy = (id) => async (dispatch) => {
  const res = apiNotification.getNotificationPharmacy(id);

  res.then((data) => {
    dispatch(setNotifications(data));
  });
};

export const fetchAdminNotifications = (id) => async (dispatch) => {
  const res = apiNotification.getAdminNotification(id);

  res.then((data) => {
    console.log("data===" + JSON.stringify(data));
    dispatch(setNotifications(data));
  });
};

export const selectNotifications = (state) => {
  return [state.notifications.notifications, state.notifications.errors];
};

export const { setNotifications, setErrors, addNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
