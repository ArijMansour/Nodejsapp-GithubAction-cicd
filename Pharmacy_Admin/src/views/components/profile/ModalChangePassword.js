import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import { ChangePassword } from "../../../app/redux/slices/UserSlice";
import { isAuth } from "../../../_helper/auth";

function ModalChangePassword({ id }) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleChangeCurrent = (e) => {
    setCurrentPass(e.target.value);
  };
  const handleChangeNew = (e) => {
    setnewPass(e.target.value);
  };
  const handleChangeConfirm = (e) => {
    setConfirmPass(e.target.value);
  };

  const ResetPassword = () => {
    if (newPass !== confirmPass) {
      SetFormClassName("warning");
      SetFormErrorMessage("new password and confirm password didnt Match !");
    } else {
      const obj = {
        password: currentPass,
        newPassword: newPass,
        idUser: id,
      };

      dispatch(ChangePassword(obj))
        .then((response) => {
          if (
            response.payload.message ===
            "Password Successfully Changed! you can login with your new password"
          ) {
            SetFormClassName("success");
            SetFormSuccessMessage(response.payload.message);
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage(response.payload.message);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              SetFormClassName("warning");
              SetFormErrorMessage(err.response.message);
            }
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage("Something wen wrong " + err);
          }
        });
    }
  };

  return (
    <div>
      <Modal
        trigger={
          <Link>
            <Header as="h6" icon="lock" content="Change Password" />
          </Link>
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>Reset your password </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={ResetPassword}>
            <Form.Input
              label="CurrentPassword"
              type="password"
              placeholder={"Current Password here ..."}
              name="Titre"
              maxLength="40"
              required
              value={currentPass}
              onChange={handleChangeCurrent}
            />
            <Form.Input
              label="NewPassword"
              type="password"
              placeholder={" New Password here ..."}
              name="Titre"
              maxLength="40"
              required
              value={newPass}
              onChange={handleChangeNew}
            />
            <Form.Input
              label="ConfirmNewPassword"
              type="password"
              placeholder={"Confirm New Password here ..."}
              name="Titre"
              maxLength="40"
              required
              value={confirmPass}
              onChange={handleChangeConfirm}
            />
            <Message
              success
              color="green"
              header="Nice one! 😛 😝"
              content={formSuccessMessage}
            />
            <Message
              warning
              color="yellow"
              header="Woah! 😱 😨"
              content={formErrorMessage}
            />
            <br />
            <Button color="black" floated="right">
              Update
            </Button>
            <br />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
export default ModalChangePassword;
