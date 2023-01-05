import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Dimmer,
  Form,
  Header,
  Loader,
  Message,
  Modal,
} from "semantic-ui-react";
import MedecineService from "../../../../infrastructure/services/api/MedecineService";
import PriceSlider from "../../slider/PriceSlider";
import "react-dropzone-uploader/dist/styles.css";

import Dropzone from "react-dropzone-uploader";
import CategoryService from "../../../../infrastructure/services/api/CategoryService";
export default function UpdateMedecineModal({ isOpen, close, medecine }) {
  const [formClassName, SetFormClassName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [expiresDate, setExpiresDate] = useState("");

  const [id, setId] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");

  const [editingMedecine, setEditingMedecine] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [selectedItem, SetSelectedItem] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [countInStock, setCountInStock] = useState(0);

  const loadCategories = () => {
    CategoryService.getCategories().then((c) => setCategories(c.data));
  };

  function getCurrentDate(current, separator = "") {
    let date = current.getDate();
    let month = current.getMonth() + 1;
    let year = current.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }
  useEffect(() => {
    loadCategories();
    setName(medecine.name);
    setPrice(medecine.price);
    setDescription(medecine.description);
    setPrice(medecine.price);
    setCategory(medecine.category);
    setId(medecine._id);
    setCountInStock(medecine.countInStock);

    const current = new Date(medecine.expiresDate);

    const date = getCurrentDate(current, "");
    setExpiresDate(date);
    setExpiresDate();
  }, [medecine]);

  const handleChangeCurrent = (e) => {
    setName((name) => e.target.value);
    setEnabled(true);
  };

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
    setEnabled(true);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setEnabled(true);
  };

  const handleChangeCountStock = (e) => {
    setCountInStock(e.target.value);
    setEnabled(true);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
    setEnabled(true);
  };
  const handleChangeExpiresDate = (e) => {
    setExpiresDate(e.target.value);
    setEnabled(true);
  };

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

  const updateMedecine = () => {
    SetLoader(true);
    const data = {
      nameCategory: selectedItem,
      nameMedecine: name,
    };
    const newMed = {
      name: name,
      description: description,
      price: price,
      countInStock: countInStock,
      expiresDate: expiresDate,
    };
    MedecineService.updateMedecine(medecine._id, newMed);
    MedecineService.assignCatToProd(data)
      .then((res) => {})
      .catch((err) => console.log(err));

    SetLoader(false);
  };

  const update = () => {
    try {
      updateMedecine();
      loadCategories();
      MedecineService.getMedecines();
      toast.success("Medecine updated");
    } catch (err) {
      toast.error("something went wrong!" + err);
    }
  };
  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Update Medecine </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={update}>
            <Form.Input
              label="name"
              type="text"
              placeholder={"name here ..."}
              name="Titre"
              maxLength="40"
              required
              onChange={handleChangeName}
              value={name}
            />
            <Form.TextArea
              label="description"
              placeholder={"Description here ..."}
              name="Description"
              rows={8}
              value={description}
              required
              onChange={handleChangeDescription}
            />
            <PriceSlider existprice={price} />
            <br />
            <Form>
              <Form.Input
                type="number"
                onChange={handleChangeCountStock}
                name="countInStock"
                defaultValue={countInStock}
              />
              <Form.Input
                type="date"
                onChange={handleChangeExpiresDate}
                name="expiresDate"
                defaultValue={expiresDate}
              />
            </Form>
            <br />
            <Dropzone
              styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
              //   onChangeStatus={handleChangeStatus}
            />
            <br />
            {loader ? (
              <Dimmer active inverted>
                <Loader inline="centered">
                  Preparing Files ... please wait !
                </Loader>
              </Dimmer>
            ) : (
              <>
                <select
                  value={selectedItem}
                  defaultValue={selectedItem}
                  onChange={handleChangeSelect}
                >
                  {categories.map((c, index) => (
                    <option key={index} value={c.key}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <Message
                  success
                  color="green"
                  header="Nice one! "
                  content={formSuccessMessage}
                />
                <Message
                  warning
                  color="yellow"
                  header="Woah! 😱 😨"
                  content={formErrorMessage}
                />
              </>
            )}
            <br />{" "}
            <button
              type="submit"
              className={`relative 
               inline-flex items-center w-full justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium
                text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400
                 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200
                  dark:focus:ring-green-800`}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Save Changes
              </span>
            </button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
