import { Dialog, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryService from "../../../infrastructure/services/api/CategoryService";

export default function PopupCategory(props) {
  const { openPopup, setOpenPopup } = props;
  const [Name, setName] = useState("");

  const [newName, setnewName] = useState("");

  const [categories, setCategories] = useState([]);
  const loadCategories = () =>
    CategoryService.getCategories().then((c) => setCategories(c.data));

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = () => {
    CategoryService.createCategory({ name: Name });
  };

  const updateCategory = (id) => {
    CategoryService.updateCategory({
      id: id,
      name: newName,
    });
  };

  function add() {
    addCategory();
    loadCategories();
    setOpenPopup(false);
    window.location.reload();
  }

  return (
    <Dialog open={openPopup}>
      <div className="ml-auto">
        <Button color="secondary" onClick={() => setOpenPopup(false)}>
          <div>
            <button class=" btn-danger">X</button>{" "}
          </div>
        </Button>
      </div>
      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-4">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            name
          </label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={add}
          className="green-800 text-white active:green-600 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          valider
        </button>
      </div>
    </Dialog>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
