import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import { UpdateSHIPPER } from "../../../../app/redux/actions/ShipperAction";

export default function UpdateShipperModal({ isOpen, close, Shipper }) {
  const [formClassName, SetFormClassName] = useState("");
  const [firstName, setFirstName] = useState(Shipper.firstName);
  const [lastName, setLastName] = useState(Shipper.lastName);
  const [phone, setPhone] = useState(Shipper.phone);
  const [city, setCity] = useState(Shipper.city);
  const [id, setId] = useState(Shipper._id);
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [Shippers, setShippers] = useState({});
  const [editingShipper, setEditingShipper] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log(Shipper);
    setFirstName(Shipper.firstName);
    setLastName(Shipper.lastName);
    setCity(Shipper.city);
    setPhone(Shipper.phone);

    setId(Shipper._id);
  }, [Shipper]);

  const handleChangeCurrent = (e) => {
    setFirstName((firstName) => e.target.value);
    setEnabled(true);
  };
  const handleChangeCurrentQte = (e) => {
    setLastName((qte) => e.target.value);
    setEnabled(true);
  };
  const handleChangeCurrentphone = (e) => {
    setPhone((phone) => e.target.value);
    setEnabled(true);
  };

  const handleChangeCurrentCity = (e) => {
    setCity((city) => e.target.value);
    setEnabled(true);
  };

  const dispatch = useDispatch();
  const handleSuccess = async () => {
    return await MySwal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const updateShipper = () => {
    let x = null;
    // if (
    //   phone !== "Available".toLowerCase() ||
    //   phone !== "Not Available".toLowerCase()
    // ) {
    //   alert(phone);

    //   toast.warning("phone of Shipper should be Available or not available");
    //   return;
    // }

    const newCat = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      city: city,
    };
    dispatch(UpdateSHIPPER(Shipper._id, newCat));
    toast.success("Shipper updated");
    getShippers();

    window.location.reload();
  };

  const update = () => {
    try {
      updateShipper();
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Update Medecine Shipper </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={update}>
            <Form.Input
              label="firstName"
              type="text"
              placeholder={"firstName here ..."}
              name="firstName"
              maxLength="40"
              value={firstName || ""}
              onChange={handleChangeCurrent}
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
            <Form.Input
              label="lastName"
              type="text"
              placeholder={"lastName here ..."}
              name="lastName"
              maxLength="40"
              value={lastName || ""}
              onChange={handleChangeCurrentQte}
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
            <Form.Input
              label="phone"
              type="text"
              placeholder={"phone here ..."}
              name="phone"
              maxLength="40"
              value={phone}
              onChange={handleChangeCurrentphone}
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

            <Form.Input
              label="city"
              type="text"
              placeholder={"city here ..."}
              name="city"
              maxLength="40"
              value={city}
              onChange={handleChangeCurrentCity}
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

            {enabled ? (
              <button
                type="submit"
                className="relative inline-flex firstNames-center w-full justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Save Changes
                </span>
              </button>
            ) : (
              <></>
            )}
          </Form>{" "}
        </Modal.Content>
      </Modal>
    </div>
  );
}
