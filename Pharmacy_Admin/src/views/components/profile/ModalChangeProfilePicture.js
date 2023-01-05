import axios from "axios";
import Cookies from "js-cookie";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";

import Dropzone from "react-dropzone-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Header,
  Image,
  Loader,
  Modal,
} from "semantic-ui-react";
import { updatePicture } from "../../../app/redux/actions/UserAction";
import {
  UpdateProfilePicture,
  UpdateUserState,
} from "../../../app/redux/slices/UserSlice";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";

import { isAuth, setLocalStorage } from "../../../_helper/auth";

function ModalChangeProfilePicture({ id, picture }) {
  const Resources = useSelector((state) => state.UserReducer.Resources);

  const [loader, setLoader] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const [iduser, setIdUser] = React.useState();
  const dispatch = useDispatch();

  const updatePPicture = () => {
    let formData = new FormData();
    setLoader(true);
    formData.append("image", avatar);
    dispatch(UpdateProfilePicture(formData, isAuth().id)).then((response) => {
      axios
        .put(
          `${API_URL}/user/updateProfilePharmacy/${id}`,
          {
            username: isAuth().username,
            phone: isAuth().phone,
            email: isAuth().email,
            pharmacyAddress: isAuth().pharmacyAddress,
            picture: response.payload,
          },
          { headers: { Authorization: `${Cookies.get("token")}` } }
        )
        .then((res) => {
          setLoader(false);

          dispatch(UpdateUserState());

          setLocalStorage("user", res.data.result);

          // setFormSuccessMessage("");
          // SetFormClassName("success");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("So:mething went wrong !!");
          setVisible(true);
          setLoader(false);

          // setFormSuccessMessage("So:mething went wrong !!");
          // SetFormClassName("warning");
        });

      console.log(response.payload);

      setLoader(false);
      setOpen(false);
    });
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setAvatar(file);
    }
    if (status === "removed") {
      console.log(status, meta, file);
    }
  };
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Image
            fluid
            centered
            style={{
              margin: "10px",
              height: "250px",
              width: "250px",
            }}
            label={{
              as: "a",
              color: "red",
              content: "Edit",
              icon: "edit",
              ribbon: true,
            }}
            src={Resources || picture}
          />
        }
      >
        <Modal.Header>Select a Photo</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
            <br />
            <br />

            <br />
            <Dropzone
              styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
              canCancel={true}
              canRemove={true}
              canRestart={true}
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              accept="image/*"
              inputContent={(files, extra) =>
                extra.reject ? "Image files only" : "Drag Files"
              }
              styles={{
                dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
                inputLabel: (files, extra) =>
                  extra.reject ? { color: "red" } : {},
              }}
            />
            <br />
            {loader ? (
              <Dimmer active>
                <Loader>Preparing Files ... please wait !</Loader>
              </Dimmer>
            ) : (
              <></>
            )}
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Discard
          </Button>
          <Button
            content="Yep, Save"
            labelPosition="right"
            icon="checkmark"
            onClick={updatePPicture}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalChangeProfilePicture;
