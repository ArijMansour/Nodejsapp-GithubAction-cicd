import { isAuth } from "../../../_helper/auth";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EMAIL_CONFIRMED_SUCCESS,
  EMAIL_CONFIRMED_FAIL,
  GET_EMAIL_CONFIRMED_SUCCESS,
  GET_EMAIL_CONFIRMED_FAIL,
  LOGOUT,
} from "../types/Types";

const user = isAuth();

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        messages: payload,
        error: true,
      };

    case EMAIL_CONFIRMED_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case EMAIL_CONFIRMED_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };

    case GET_EMAIL_CONFIRMED_SUCCESS:
      return {
        ...state,
        response: payload,
      };
    case GET_EMAIL_CONFIRMED_FAIL:
      return {
        ...state,
        messages: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.auth,
          user: {
            ...state.auth.user,
            following: [...state.auth.user.following, action.data],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };

    default:
      return state;
  }
}
