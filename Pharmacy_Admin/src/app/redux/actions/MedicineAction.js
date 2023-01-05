import axios from "axios";
import {
  MEDICINE_LIST_REQUEST,
  MEDICINE_LIST_SUCCESS,
  MEDICINE_LIST_FAIL,
  MEDICINE_DETAILS_REQUEST,
  MEDICINE_DETAILS_SUCCESS,
  MEDICINE_DETAILS_FAIL,
  MEDICINE_DELETE_REQUEST,
  MEDICINE_DELETE_SUCCESS,
  MEDICINE_DELETE_FAIL,
  MEDICINE_CREATE_REQUEST,
  MEDICINE_CREATE_FAIL,
  MEDICINE_CREATE_SUCCESS,
  MEDICINE_CREATE_RESET,
  MEDICINE_UPDATE_REQUEST,
  MEDICINE_UPDATE_FAIL,
  MEDICINE_UPDATE_SUCCESS,
  MEDICINE_CREATE_REVIEW_REQUEST,
  MEDICINE_CREATE_REVIEW_SUCCESS,
  MEDICINE_CREATE_REVIEW_FAIL,
} from "../types/MedicineType";

import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import Cookies from "js-cookie";
export const listProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: MEDICINE_LIST_REQUEST });
      const { data } = await axios.get(
        `${API_URL}/getMedecines?keyword=${keyword}`
      );

      dispatch({ type: MEDICINE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEDICINE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const ListproductbyCg = (Cg) => async (dispatch) => {
  try {
    dispatch({ type: MEDICINE_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/getMedecines/?Cg=${Cg}`);
    dispatch({ type: MEDICINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDICINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Listproductbyfiter = (filter) => async (dispatch) => {
  try {
    dispatch({ type: MEDICINE_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/medecines/?filter=${filter}`);
    dispatch({ type: MEDICINE_LIST_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: MEDICINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Listproductbyprice = (from, to) => async (dispatch) => {
  try {
    dispatch({ type: MEDICINE_LIST_REQUEST });
    const { data } = await axios.get(
      `${API_URL}/medecines/?from=${from}&to=${to}`
    );

    dispatch({ type: MEDICINE_LIST_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: MEDICINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEDICINE_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}/medecine/${id}`);

    dispatch({ type: MEDICINE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEDICINE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const DeleteProduct = (id) => async(dispatch, getState) => {
//     try {
//         dispatch({
//             type: MEDICINE_DELETE_REQUEST
//         })

//         const { userLogin: {userInfo} } = getState()

//         const config = {
//             headers:{
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         await axios.delete(`/api/products/${id}`, config)
//         dispatch({
//             type: MEDICINE_DELETE_SUCCESS,
//                 })

//     } catch (error) {
//         dispatch({
//             type: MEDICINE_DELETE_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         })

//     }
// }

// export const CreateProduct = () => async(dispatch, getState) => {
//     try {
//         dispatch({
//             type: MEDICINE_CREATE_REQUEST
//         })

//         const { userLogin: {userInfo} } = getState()

//         const config = {
//             headers:{
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const {data} = await axios.post(`/api/products/`,{}, config)
//         dispatch({
//             type: MEDICINE_CREATE_SUCCESS,
//             payload : data
//                 })

//     } catch (error) {
//         dispatch({
//             type: MEDICINE_CREATE_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         })

//     }
// }

// export const UpdateProduct = (product) => async(dispatch, getState) => {
//     console.log(product)

//     try {
//         dispatch({
//             type: MEDICINE_UPDATE_REQUEST
//         })

//         const { userLogin: {userInfo} } = getState()

//         const config = {
//             headers:{
//                 'Content-Type' : 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const {data} = await axios.put(`/api/products/${product._id}`,product, config)
//         dispatch({
//             type: MEDICINE_UPDATE_SUCCESS,
//             payload : data
//                 })

//     } catch (error) {
//         dispatch({
//             type: MEDICINE_UPDATE_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         })

//     }
// }

export const createproductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEDICINE_CREATE_REVIEW_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();
      console.log(review);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("token")}`,
        },
      };

      await axios.post(`${API_URL}/${productId}/reviews`, review, config);
      dispatch({
        type: MEDICINE_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: MEDICINE_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
