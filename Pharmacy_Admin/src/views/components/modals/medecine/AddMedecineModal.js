import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-dropzone-uploader/dist/styles.css";

import Dropzone from "react-dropzone-uploader";
import {
  Button,
  Dimmer,
  Form,
  Header,
  Label,
  Loader,
  Message,
  Modal,
  TextArea,
} from "semantic-ui-react";
import MedecineService from "../../../../infrastructure/services/api/MedecineService";
import CategoryService from "../../../../infrastructure/services/api/CategoryService";
import { DatePicker } from "../../datepicker/DatePicker";
import PriceSlider from "../../slider/PriceSlider";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { createMedecine } from "../../../../app/redux/slices/MedecineSlice";

export default function AddMedecineModal({ isOpen, close }) {
  const [formClassName, SetFormClassName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [expiresDate, setExpiresDate] = useState("");
  const [inStock, setInStock] = useState();
  const [category, setCategory] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [selectedItem, SetSelectedItem] = useState();
  const [selectedItemType, setSelectedItemType] = useState([]);

  const options = [
    {
      name: "Select Type...",
      typeMedicine: null,
    },
    {
      name: "Cosmetic",
      typeMedicine: "cosmetic",
    },
    {
      name: "Drug",
      typeMedicine: "drug",
    },
  ];

  const [multiple_resources, SetMultiple_resources] = useState([]);

  const [categories, setCategories] = useState([]);
  const [medecines, setMedecines] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    alert(e.target.value);
    await SetSelectedItem(e.target.value);
  };
  const handleChangeSelectType = (e) => {
    console.log(e.target.value);
    setSelectedItemType(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
    setEnabled(true);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
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

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      SetMultiple_resources((state) => [...state, file]);
    }
    if (status === "removed") {
      let multiple_resource = multiple_resources.slice();
      multiple_resource = multiple_resources.filter((u) => {
        return u !== file;
      });
      SetMultiple_resources(multiple_resource);
    }
  };
  const loadCategories = () => {
    CategoryService.getCategories().then((c) => {
      setCategories(c.data);
    });
  };
  const loadMedecines = () =>
    MedecineService.getMedecines().then((c) => setMedecines(c.data));

  useEffect(() => {
    loadCategories();
    loadMedecines();
  }, []);

  const addMedecine = () => {
    // if (
    //   name &&
    //   description &&
    //   expiresDate &&
    //   multiple_resources &&
    //   selectedItem
    // ) {
    SetLoader(true);
    console.log(multiple_resources);
    const medecine = {
      name: name,

      description: description,
      price: localStorage.getItem("price"),
      expiresDate: expiresDate,
      inStock: true,
      multiple_resources: multiple_resources,
      selectedItem,
      typeMedicine: selectedItemType,
    };
    alert(JSON.stringify(medecine));
    dispatch(
      createMedecine(
        medecine.name,
        medecine.description,
        medecine.price,
        medecine.expiresDate,
        medecine.inStock,
        multiple_resources,
        medecine.typeMedicine
      )
    )
      .then((response) => {
        if (response.exist === false) {
          SetFormClassName("warning");
          SetFormErrorMessage(response.error);
          alert(JSON.stringify(response));
        } else if (response.success === true) {
          const data = {
            nameCategory: selectedItem,
            nameMedecine: name,
          };
          MedecineService.assignCatToProd(data)
            .then((res) => {})
            .catch((err) => console.log(err));

          // SetFormClassName("success");
          // SetFormSuccessMessage(response.message);
          // window
          toast.success("Medecine added");
          window.location.reload();
        } else if (response.medecineExist === true) {
          SetFormClassName("warning");
          SetFormErrorMessage(response.error);
          alert(JSON.stringify(response));
        } else {
          SetFormClassName("warning");
          SetFormErrorMessage(response.error);
          alert(JSON.stringify(response));
        }
      })
      .catch((err) => {
        SetFormClassName("err");
        SetFormErrorMessage("Something wen wrong " + err);
      });

    SetLoader(false);
    // } else {
    //   SetFormClassName("warning");
    //   SetFormErrorMessage("All inputs are required ");
    // }
  };

  const updateMedecine = (id) => {
    MedecineService.updateMedecine({
      id: id,
      name: newName,
    });
  };

  function add() {
    addMedecine();
    loadMedecines();

    //   window.location.reload();
  }

  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Add Medecine </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={add} noValidate>
            <Form.Input
              label="name"
              type="text"
              placeholder={"name here ..."}
              name="Titre"
              maxLength="40"
              required
              onChange={handleChangeName}
            />
            <select onChange={handleChangeSelectType} value={selectedItemType}>
              {options.map((item) => (
                <option key={item.typeMedicine} value={item.typeMedicine}>
                  {item.name}
                </option>
              ))}
            </select>
            <Form.TextArea
              label="description"
              placeholder={"Description here ..."}
              name="Description"
              rows={8}
              required
              onChange={handleChangeDescription}
            />
            <PriceSlider />
            <Form>
              <Form.Input
                type="date"
                onChange={handleChangeExpiresDate}
                name="expiresDate"
              />
            </Form>
            <br />
            <Dropzone
              styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
              onChangeStatus={handleChangeStatus}
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
                <select value={selectedItem} onChange={handleChangeSelect}>
                  {categories.map((c, index) => (
                    <option key={index} value={c.key}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            <Message
              success
              color="green"
              header="Success! 😛 😝"
              content={formSuccessMessage}
            />
            <Message
              warning
              color="red"
              header="Failed! 😱 😨"
              content={formErrorMessage}
              width="100"
            />
            <br />{" "}
            <button
              type="submit"
              className={`relative cursor-pointer
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
