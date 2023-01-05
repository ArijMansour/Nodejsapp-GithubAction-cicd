import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import {
  SHIPPER_LIST_REQUEST,
  SHIPPER_LIST_SUCCESS,
  SHIPPER_LIST_FAIL,
  SHIPPER_DETAILS_REQUEST,
  SHIPPER_DETAILS_SUCCESS,
  SHIPPER_DETAILS_FAIL,
  SHIPPER_DELETE_REQUEST,
  SHIPPER_DELETE_SUCCESS,
  SHIPPER_DELETE_FAIL,
  SHIPPER_CREATE_REQUEST,
  SHIPPER_CREATE_FAIL,
  SHIPPER_CREATE_SUCCESS,
  SHIPPER_CREATE_RESET,
  SHIPPER_UPDATE_REQUEST,
  SHIPPER_UPDATE_FAIL,
  SHIPPER_UPDATE_SUCCESS,
  SHIPPER_CREATE_REVIEW_REQUEST,
  SHIPPER_CREATE_REVIEW_SUCCESS,
  SHIPPER_CREATE_REVIEW_FAIL,
} from "../types/ShipperType";
export const listSHIPPERs =
  (keyword = "") =>
  (dispatch) => {
    try {
      dispatch({ type: SHIPPER_LIST_REQUEST });
      const { data } = axios.get(`${API_URL}/user/getShippers`);

      dispatch({ type: SHIPPER_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SHIPPER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listSHIPPERDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHIPPER_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}/user/getShipper/${id}`);

    dispatch({ type: SHIPPER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIPPER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const DeleteSHIPPER = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIPPER_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    };

    await axios.delete(`${API_URL}/user/deleteShipper/${id}`, config);
    dispatch({
      type: SHIPPER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SHIPPER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const CreateSHIPPER = (shipper) => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    };

    const { data } = await axios
      .post(`${API_URL}/user/createShipper`, shipper, config)
      .then((res) => {});
    dispatch({
      type: SHIPPER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateSHIPPER = (id, SHIPPER) => async (dispatch, getState) => {
  console.log(SHIPPER);

  try {
    dispatch({
      type: SHIPPER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Cookies.get("token")}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/user/updateShipper/${id}`,
      SHIPPER,
      config
    );
    dispatch({
      type: SHIPPER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createSHIPPERReview =
  (SHIPPERId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHIPPER_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/SHIPPERs/${SHIPPERId}/reviews`, review, config);
      dispatch({
        type: SHIPPER_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: SHIPPER_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
