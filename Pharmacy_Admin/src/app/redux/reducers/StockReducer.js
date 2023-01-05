import {
  STOCK_CREATE_FAIL,
  STOCK_CREATE_REQUEST,
  STOCK_CREATE_RESET,
  STOCK_CREATE_SUCCESS,
  STOCK_DELETE_FAIL,
  STOCK_DELETE_REQUEST,
  STOCK_DELETE_SUCCESS,
  STOCK_LIST_MY_FAIL,
  STOCK_LIST_MY_REQUEST,
  STOCK_LIST_MY_RESET,
  STOCK_LIST_MY_SUCCESS,
  STOCK_UPDATE_FAIL,
  STOCK_UPDATE_REQUEST,
  STOCK_UPDATE_RESET,
  STOCK_UPDATE_SUCCESS,
} from "../types/StockType";

export const stockCreateReducer = (
  state = { loading: false, success: false, error: false },
  action
) => {
  switch (action.type) {
    case STOCK_CREATE_REQUEST:
      return { loading: true };
    case STOCK_CREATE_SUCCESS:
      return { loading: false, success: true, stock: action.payload };
    case STOCK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stockDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_DELETE_REQUEST:
      return { loading: true };
    case STOCK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STOCK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const StockListMyreducer = (
  state = { stocks: [], loading: false },
  action
) => {
  switch (action.type) {
    case STOCK_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case STOCK_LIST_MY_SUCCESS:
      return {
        loading: false,
        stocks: action.payload,
      };
    case STOCK_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case STOCK_LIST_MY_RESET:
      return { stocks: [] };
    default:
      return state;
  }
};

export const stockUpdateReducer = (state = { stock: {} }, action) => {
  switch (action.type) {
    case STOCK_UPDATE_REQUEST:
      return { loading: true };
    case STOCK_UPDATE_SUCCESS:
      return { loading: false, success: true, stock: action.payload };
    case STOCK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_UPDATE_RESET:
      return { stock: {} };
    default:
      return state;
  }
};
