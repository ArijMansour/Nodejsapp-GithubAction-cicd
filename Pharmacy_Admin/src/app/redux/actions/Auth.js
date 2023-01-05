import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  EMAIL_CONFIRMED_SUCCESS,
  EMAIL_CONFIRMED_FAIL,
  GET_EMAIL_CONFIRMED_FAIL,
  GET_EMAIL_CONFIRMED_SUCCESS,
} from "../types/Types";
import AuthService from "../../../infrastructure/services/api/AuthentificationService.js";
import { toast } from "react-toastify";

export const SignUpPatientAction =
  (username, firstName, lastName, phone, email, password, address, confirm) =>
  (dispatch) => {
    return AuthService.signUpPatient(
      username,
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      confirm
    ).then(
      (response) => {
        dispatch({
          type: EMAIL_CONFIRMED_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response,
        });
        return response;
      },
      (error) => {
        dispatch({
          type: EMAIL_CONFIRMED_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.response,
        });
        return error.response;
      }
    );
  };

export const SignUpAction =
  (username, phone, email, password, confirm) => (dispatch) => {
    return AuthService.signUp(username, phone, email, password, confirm).then(
      (response) => {
        dispatch({
          type: EMAIL_CONFIRMED_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response,
        });
        return response;
      },
      (error) => {
        dispatch({
          type: EMAIL_CONFIRMED_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.response,
        });
        return error.response;
      }
    );
  };

export const SignInAction = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      });
      return response;
    },

    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
        payload: {
          messages: message,
        },
      });

      return message;
    }
  );
};

export const LogoutAction = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const ActivateEmailAction = (token) => (dispatch) => {
  return AuthService.activateEmail(token).then(
    (data) => {
      if (data.data.errors) {
        dispatch({
          type: GET_EMAIL_CONFIRMED_FAIL,
          payload: {
            messages: data.data,
          },
        });
        return data.data;
      } else {
        dispatch({
          type: GET_EMAIL_CONFIRMED_SUCCESS,
          payload: { response: data },
        });
        return data;
      }
    },
    (errors) => {
      const message =
        (errors.response &&
          errors.response.data &&
          errors.response.data.errors) ||
        errors.message ||
        errors.toString();
      dispatch({
        type: GET_EMAIL_CONFIRMED_FAIL,
        payload: {
          messages: message,
        },
      });

      return message;
    }
  );
};

export const ActivateEmailPatientAction = (token) => (dispatch) => {
  return AuthService.activateEmailPatient(token).then(
    (data) => {
      if (data.data.errors) {
        dispatch({
          type: GET_EMAIL_CONFIRMED_FAIL,
          payload: {
            messages: data.data,
          },
        });
        return data.data;
      } else {
        dispatch({
          type: GET_EMAIL_CONFIRMED_SUCCESS,
          payload: { response: data },
        });
        return data;
      }
    },
    (errors) => {
      const message =
        (errors.response && errors.response.data) || errors.toString();

      dispatch({
        type: GET_EMAIL_CONFIRMED_FAIL,
        payload: {
          messages: message,
        },
      });

      return message;
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const forgetPassword = (email) => (dispatch) => {
  return AuthService.forgetPassword(email).then(
    (data) => {
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: { response: data },
      });
      return data;
    },
    (error) => {
      dispatch({
        type: FORGET_PASSWORD_FAIL,
        payload: { response: error },
      });

      return error.response;
    }
  );
};
export const resetPassword = (password, resetPasswordLink) => (dispatch) => {
  return AuthService.resetPassword(password, resetPasswordLink).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
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
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return error.response;
    }
  );
};

export const confirmEmail = (token, email) => (dispatch) => {
  return AuthService.confirmEmail(token, email).then(
    (data) => {
      dispatch({
        type: GET_EMAIL_CONFIRMED_SUCCESS,
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
        type: GET_EMAIL_CONFIRMED_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return error;
    }
  );
};
