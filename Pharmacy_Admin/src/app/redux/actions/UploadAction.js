import * as UploadApi from "../../../infrastructure/services/api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start ho gya hy");
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {T
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
