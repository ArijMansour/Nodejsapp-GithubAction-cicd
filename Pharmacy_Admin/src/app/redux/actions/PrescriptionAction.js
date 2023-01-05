import PrescriptionService from "../../../infrastructure/services/api/PrescriptionService";
import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_DELETE_REQUEST,
  PRESCRIPTION_DELETE_SUCCESS,
  PRESCRIPTION_LIST_MY_FAIL,
  PRESCRIPTION_LIST_MY_REQUEST,
  PRESCRIPTION_LIST_MY_SUCCESS,
} from "../types/PrescriptionType";
import { toast } from "react-toastify";

export const CreatePrescription =
  (description, multiple_resources, pharmacy) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRESCRIPTION_CREATE_REQUEST,
      });
      console.log(multiple_resources);
      const formData = new FormData();
      for (const key of Object.keys(multiple_resources)) {
        formData.append("multiple_resources", multiple_resources[key]);
        console.log(key);
      }
      formData.append("description", description);
      formData.append("pharmacy", pharmacy);
      PrescriptionService.createPrescription(formData).then((response) => {
        localStorage.setItem("presc", response.data.result._id);
        dispatch({
          type: PRESCRIPTION_CREATE_SUCCESS,
          payload: response,
        });

        if (response.data.success) {
          toast.success("your prescription was send successfully!");

          return;
        }
      });
    } catch (error) {
      dispatch({
        type: PRESCRIPTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listPrescriptions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_LIST_MY_REQUEST,
    });

    PrescriptionService.myPrescription().then((response) => {
      dispatch({
        type: PRESCRIPTION_LIST_MY_SUCCESS,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const DeletePrescription = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_DELETE_REQUEST,
    });

    await PrescriptionService.removePrescription(id);
    dispatch({
      type: PRESCRIPTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: Prescription_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
