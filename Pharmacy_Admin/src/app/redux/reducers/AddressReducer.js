import {
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_RESET,
  ADDRESS_UPDATE_SUCCESS,
} from "../types/AddressType";

export const addressUpdateReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case ADDRESS_UPDATE_REQUEST:
      return { loading: true };
    case ADDRESS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADDRESS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_UPDATE_RESET:
      return { addresses: [] };
    default:
      return state;
  }
};
