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
  MEDICINE_UPDATE_SUCCESS,
  MEDICINE_UPDATE_FAIL,
  MEDICINE_UPDATE_RESET,
  MEDICINE_CREATE_REVIEW_REQUEST,
  MEDICINE_CREATE_REVIEW_SUCCESS,
  MEDICINE_CREATE_REVIEW_FAIL,
  MEDICINE_CREATE_REVIEW_RESET,
} from "../types/MedicineType";
export const MedicineListReducer = (
  state = { medicines: [], loading: true, error: false },

  action
) => {
  switch (action.type) {
    case MEDICINE_LIST_REQUEST:
      return { loading: true, medicines: [] };
    case MEDICINE_LIST_SUCCESS:
      return { loading: false, medicines: action.payload };

    case MEDICINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const medicineDetailsReducer = (
  state = {
    product: { reviews: [], multiple_resources: [], category: [] },
    loading: true,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case MEDICINE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MEDICINE_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case MEDICINE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDICINE_DELETE_REQUEST:
      return { loading: true };
    case MEDICINE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MEDICINE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDICINE_CREATE_REQUEST:
      return { loading: true };
    case MEDICINE_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case MEDICINE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MEDICINE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case MEDICINE_UPDATE_REQUEST:
      return { loading: true };
    case MEDICINE_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case MEDICINE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case MEDICINE_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const medicinereviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDICINE_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case MEDICINE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case MEDICINE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case MEDICINE_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
