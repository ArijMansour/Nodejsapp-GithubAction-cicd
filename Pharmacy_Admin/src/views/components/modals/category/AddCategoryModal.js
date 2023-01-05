import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import CategoryService from "../../../../infrastructure/services/api/CategoryService";
import { isAuth } from "../../../../_helper/auth";

export default function AddCategoryModal({ isOpen, close }) {
  const [formClassName, SetFormClassName] = useState("");
  const [name, setName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {}, []);

  const handleChangeCurrent = (e) => {
    setName(e.target.value);
  };
  const [categories, setCategories] = useState([]);
  const loadCategories = () =>
    CategoryService.getCategories().then((c) => setCategories(c.data));

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = () => {
    CategoryService.createCategory({ name: name });
  };

  const updateCategory = (id) => {
    CategoryService.updateCategory({
      id: id,
      name: newName,
    });
  };

  function add() {
    try {
      addCategory();
      loadCategories();
      toast.success("Category added");
      window.location.reload();
    } catch (err) {
      toast.error("something went wrong!");
    }
  }

  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Add Medecine category </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={add}>
            <Form.Input
              label="name"
              type="text"
              placeholder={"name here ..."}
              name="Titre"
              maxLength="40"
              required
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
