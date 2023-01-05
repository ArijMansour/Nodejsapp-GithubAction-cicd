import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import authHeader from "../../../infrastructure/services/api/AuthentificationHeader";
import { isAuth } from "../../../_helper/auth";

export const UpdateProfilePicture = createAsyncThunk(
  "users/UpdateProfilePicture",

  async (resources, id) => {
    alert(JSON.stringify(isAuth().id));
    const promise = await axios.put(
      `${API_URL}/user/updateProfilePicture/${isAuth().id}`,
      resources,
      { headers: authHeader(resources) }
    );
    return promise.data.picture;
  }
);

export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const { data } = await axios.get(`${API_URL}/user/getUserById/${id}`, {
    headers: { Authorization: `${Cookies.get("token")}` },
  });

  return data;
});
export const ChangePassword = createAsyncThunk(
  "users/changepassword",
  async (object) => {
    const { data } = await axios.put(`${API_URL}/user/changepassword`, object, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

    return data;
  }
);

export const updateAdminProfile = createAsyncThunk(
  "users/updateProfileAdmin",
  async (id, object) => {
    console.log(object);
    const data = await axios.put(
      `${API_URL}/user/updateProfileAdmin/${id}`,
      object,
      { headers: { Authorization: `${Cookies.get("token")}` } }
    );

    return data;
  }
);

export const UpdateUserState = createAsyncThunk(
  "users/UpdateUserState",
  async () => {}
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    Resources: "",
    UserById: null,
    statusChangePassword: null,
    userUpdated: false,
    User: null,
  },

  extraReducers: {
    [UpdateProfilePicture.fulfilled]: (state, action) => {
      state.Resources = action.payload;
    },
    [updateAdminProfile.fulfilled]: (state, action) => {
      state.User = action.payload.data;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.UserById = action.payload;
      state.Resources = state.UserById.picture;
    },
    [ChangePassword.fulfilled]: (state, action) => {
      state.statusChangePassword = "changed !";
    },
    [UpdateUserState.fulfilled]: (state, action) => {
      state.userUpdated = !state.userUpdated;
    },
  },
});
export default UserSlice.reducer;
