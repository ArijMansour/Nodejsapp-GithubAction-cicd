import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_RESET,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_DELETE_FAIL,
  PRESCRIPTION_DELETE_REQUEST,
  PRESCRIPTION_DELETE_SUCCESS,
  PRESCRIPTION_LIST_MY_FAIL,
  PRESCRIPTION_LIST_MY_REQUEST,
  PRESCRIPTION_LIST_MY_RESET,
  PRESCRIPTION_LIST_MY_SUCCESS,
} from "../types/PrescriptionType";

export const prescriptionCreateReducer = (
  state = { loading: false, success: false, error: false },
  action
) => {
  switch (action.type) {
    case PRESCRIPTION_CREATE_REQUEST:
      return { loading: true };
    case PRESCRIPTION_CREATE_SUCCESS:
      return { loading: false, success: true, prescription: action.payload };
    case PRESCRIPTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};



export const prescriptionDeleteReducer = (
  state={},action) => {
  switch(action.type) {
      case PRESCRIPTION_DELETE_REQUEST :
          return {loading : true}
      case PRESCRIPTION_DELETE_SUCCESS :
          return {loading : false , success: true}
      case PRESCRIPTION_DELETE_FAIL :
          return {loading : false , error : action.payload}
      default :
      return state  
      }
} 

export const PrescriptionListMyreducer = (
  state = { prescriptions: [], loading: false },
  action
) => {
  switch (action.type) {
    case PRESCRIPTION_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case PRESCRIPTION_LIST_MY_SUCCESS:
      return {
        loading: false,
        prescriptions: action.payload,
      };
    case PRESCRIPTION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRESCRIPTION_LIST_MY_RESET:
      return { prescriptions: [] };
    default:
      return state;
  }
};
