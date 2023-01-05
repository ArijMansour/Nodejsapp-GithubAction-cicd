import StockService from "../../../infrastructure/services/api/StockService";

import { toast } from "react-toastify";
import {
  STOCK_CREATE_REVIEW_FAIL,
  STOCK_CREATE_REVIEW_REQUEST,
  STOCK_CREATE_REVIEW_SUCCESS,
  STOCK_DELETE_FAIL,
  STOCK_DELETE_REQUEST,
  STOCK_DELETE_SUCCESS,
  STOCK_LIST_MY_FAIL,
  STOCK_LIST_MY_REQUEST,
  STOCK_LIST_MY_SUCCESS,
} from "../types/StockType";

export const CreateStock = () => async (dispatch) => {
  try {
    dispatch({
      type: STOCK_CREATE_REQUEST,
    });
    StockService.myStock().then((data) => {
      dispatch({
        type: STOCK_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    dispatch({
      type: STOCK_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStocks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOCK_LIST_MY_REQUEST,
    });

    StockService.myStock().then((response) => {
      dispatch({
        type: STOCK_LIST_MY_SUCCESS,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: STOCK_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const DeleteStock = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STOCK_DELETE_REQUEST,
    });

    await StockService.removeStock(id);
    dispatch({
      type: STOCK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STOCK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
