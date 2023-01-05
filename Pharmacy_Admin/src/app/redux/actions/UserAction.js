import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl.js";
import UserService from "../../../infrastructure/services/api/UserService.js";
import {
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  SET_MESSAGE,
  UPDATE_P_PASSWORD_SUCCESS,
  UPDATE_P_PASSWORD_FAIL,
  UPDATE_P_PICTURE_SUCCESS,
  UPDATE_P_PICTURE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
} from "../types/Types";

export const updateProfile =
  (username, email, dateBirth, gender, phoneNumber, Avatar) => (dispatch) => {
    return UserService.updateProfile(
      username,
      email,
      dateBirth,
      gender,
      phoneNumber,
      Avatar
    ).then(
      (response) => {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return response;
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: UPDATE_PROFILE_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return error;
      }
    );
  };

//UPDATE PASSWORD
export const updatePassword =
  (currentPassword, password, email) => (dispatch) => {
    return UserService.updatePassword(currentPassword, password, email).then(
      (data) => {
        dispatch({
          type: UPDATE_P_PASSWORD_SUCCESS,
          payload: { response: data },
        });
        return data;
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: UPDATE_P_PASSWORD_FAIL,
        });
        return message;
      }
    );
  };

//UPDATE PASSWORD
export const updatePicture = (formData, id) => (dispatch) => {
  return UserService.updatePicture(formData, id).then(
    (data) => {
      dispatch({
        type: UPDATE_P_PICTURE_SUCCESS,
        payload: { response: data },
      });
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: UPDATE_P_PICTURE_FAIL,
      });
      return message;
    }
  );
};

export const GetUserByEmail = (email) => (dispatch) => {
  return UserService.GetUserByEmail(email).then(
    (response) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
      return response.data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_USER_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  UserApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  UserApi.unfollowUser(id, data);
};
export const GetAllUser = () => (dispatch) => {};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    console.log("Action ko receive hoa hy ye : ", data);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${API_URL}/user/${id}`, {
      headers: { Authorization: `${Cookies.get("token")}` },
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
