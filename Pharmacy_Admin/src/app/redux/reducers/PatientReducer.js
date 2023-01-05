import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
} from "../types/Types";

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

// export const userUpdateProfileReducer = (state={},action) => {
//     switch(action.type) {
//         case USER_UPDATE_PROFILE_REQUEST :
//             return {loading : true, }
//         case USER_UPDATE_PROFILE_SUCCESS :
//             return {loading : false , success: true, userInfo: action.payload}
//         case USER_UPDATE_PROFILE_FAIL :
//             return {loading : false , error : action.payload}

//         default :
//         return state
//         }
// }
