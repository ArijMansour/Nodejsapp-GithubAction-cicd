import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import CategoryService from "../../../../infrastructure/services/api/CategoryService";

export default function UpdateCategoryModal({ isOpen, close, category }) {
  const [formClassName, SetFormClassName] = useState("");
  const [name, setName] = useState(category.name);
  const [id, setId] = useState(category._id);
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");

  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setName(category.name);
    setId(category._id);
  }, [category]);

  const handleChangeCurrent = (e) => {
    setName((name) => e.target.value);
    setEnabled(true);
  };
  const loadCategories = () => {
    CategoryService.getCategories().then((c) => setCategories(c.data));
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

  const updateCategory = () => {
    const newCat = {
      name: name,
    };
    CategoryService.updateCategory(category._id, newCat);
  };

  const update = () => {
    try {
      updateCategory();
      loadCategories();
      toast.success("Category updated");
      window.location.reload();
    } catch (err) {
      toast.error("something went wrong!");
    }
  };
  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Update Medecine category </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={update}>
            <Form.Input
              label="name"
              type="text"
              placeholder={"name here ..."}
              name="name"
              maxLength="40"
              value={name || ""}
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
            {enabled ? (
              <button
                type="submit"
                className="relative inline-flex items-center w-full justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
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
