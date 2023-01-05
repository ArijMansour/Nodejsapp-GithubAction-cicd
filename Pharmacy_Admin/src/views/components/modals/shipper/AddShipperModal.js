import axios from "axios";
import Cookies from "js-cookie";
import { last } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import { CreateSHIPPER } from "../../../../app/redux/actions/ShipperAction";
import { API_URL } from "../../../../infrastructure/services/api/ApiUrl";

export default function AddShipperModal({ isOpen, close }) {
  const [formClassName, SetFormClassName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(true);
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const shipperCreate = useSelector((state) => state.shipperCreate);

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const handleChangeFirstNameCurrent = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleChangeLastNameCurrent = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleChangePhoneCurrent = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const handleChangeCityCurrent = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/getShippers`, {
        headers: { Authorization: `${Cookies.get("token")}` },
      })
      .then((c) => {
        setShippers(c.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const addShipper = () => {
    // alert(item);
    // alert(quantity);
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      city.length === 0 ||
      phone.length === 0
    ) {
      toast.error("All fields are required");
      return;
    }

    dispatch(
      CreateSHIPPER({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        city: city,
      })
    );
  };

  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Add Shipper </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={addShipper} noValidate>
            <Form.Input
              label="firstName"
              type="text"
              placeholder={"firstName here ..."}
              name="firstName"
              maxLength="40"
              required
              onChange={handleChangeFirstNameCurrent}
            />
            <Form.Input
              label="lastName"
              type="text"
              placeholder={"lastName here ..."}
              name="lastName"
              maxLength="40"
              required
              onChange={handleChangeLastNameCurrent}
            />

            <Form.Input
              label="phone"
              type="text"
              placeholder={"phone here ..."}
              name="phone"
              maxLength="12"
              required
              onChange={handleChangePhoneCurrent}
            />

            <Form.Input
              label="city"
              type="text"
              placeholder={"city here ..."}
              name="city"
              maxLength="12"
              required
              onChange={handleChangeCityCurrent}
            />

            {/* <Form.Input
              label="state"
              type="text"
              placeholder={"number here ..."}
              name="state"
              required
              onChange={handleStateChangeCurrent}
            /> */}
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
            <button className="text-white bg-gradient-to-r w-full from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Save
            </button>
            <br />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
