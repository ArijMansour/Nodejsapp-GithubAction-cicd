// import {

//     UPDATE_PROFILE_SUCCESS,
//     UPDATE_PROFILE_FAIL,GET_USER_SUCCESS,GET_USER_FAIL,

//   } from "../types/Types";
//   import UserService from "../../../infrastructure/services/api/UserService.ts";

//   const user = {};
//   const initialState = user;
//   export default function (state = initialState, action) {
//     const { type, payload } = action;
//     switch (type) {
//       case UPDATE_PROFILE_SUCCESS:
//         return {
//           ...state,
//           user: payload.response,
//         };
//       case UPDATE_PROFILE_FAIL:
//         return {
//           ...state,
//           user:null,
//         }
//           return null;

//         case GET_USER_SUCCESS:
//         return {
//           ...state,
//           user: payload.response,
//         }

//         case GET_USER_FAIL:
//             return {
//               ...state,
//               user: null,
//             };

//             default:
//                 return state;
//             }
//           }

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../../infrastructure/services/api/AuthentificationHeader.js";

export const UpdateProfilePicture = createAsyncThunk(
  "users/UpdateProfilePicture",

  async (resources) => {
    const promise = await axios.put(
      "https://localhost:44397/api/User/updatePicture",
      resources
    );
    console.log("Image profile ", JSON.stringify(promise));
    return promise.data.result.reqFiles[0].url;
  }
);

export const UpdatePassword = createAsyncThunk(
  "User/updatePassowrd",
  async (object) => {
    //    alert("YOU CAN MENTION IT HERE ===",JSON.stringify(object))
    return await axios.put(
      "https://localhost:44397/api/User/updatePassword",
      object
    );
  }
);

export const getUserByEmail = createAsyncThunk(
  "getUserByEmail/email",
  async (email) => {
    const { data } = await axios.get(
      "https://localhost:44397/getUserByEmail/email?email=" + email,
      { headers: authHeader() }
    );

    return data;
  }
);

export const UpdateUserState = createAsyncThunk(
  "users/UpdateUserState",
  async () => {}
);

export const UserReducer = createSlice({
  name: "user",
  initialState: {
    Resources: "",
    userByEmail: null,
    userUpdated: false,
    statusUpdatePassword: null,
  },

  extraReducers: {
    // [UpdateProfilePicture.fulfilled]: (state, action) => {
    //     state.Resources = action.payload;
    // },
    [getUserByEmail.fulfilled]: (state, action) => {
      state.userByEmail = action.payload;
      state.Resources = state.userByEmail.avatar;
    },

    [UpdateUserState.fulfilled]: (state, action) => {
      state.userUpdated = !state.userUpdated;
    },
    [UpdatePassword.fulfilled]: (state, action) => {
      state.statusUpdatePassword = "changed !!";
    },
    [UpdateProfilePicture.fulfilled]: (state, action) => {
      state.Resources = action.payload;
    },
  },
});
export default UserReducer.reducer;
