import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import StockService from "../../../../infrastructure/services/api/StockService";

export default function UpdateStockModal({ isOpen, close, stock }) {
  const [formClassName, SetFormClassName] = useState("");
  const [item, setItem] = useState(stock.item);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [state, setState] = useState(stock.state);
  const [id, setId] = useState(stock._id);
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [stocks, setStocks] = useState({});
  const [editingStock, setEditingStock] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log(stock);
    setItem(stock.item);
    setQuantity(stock.quantity);

    if (stock.state === true) setState("Available".toLowerCase());
    else if (stock.state === false) {
      setState("Not Available".toLowerCase());
    }
    setId(stock._id);
  }, [stock]);

  const handleChangeCurrent = (e) => {
    setItem((item) => e.target.value);
    setEnabled(true);
  };
  const handleChangeCurrentQte = (e) => {
    setQuantity((qte) => e.target.value);
    setEnabled(true);
  };
  const handleChangeCurrentState = (e) => {
    setState((state) => e.target.value);
    setEnabled(true);
  };
  const loadStocks = () => {
    StockService.getStocks().then((c) => setStocks(c.data));
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

  const updateStock = () => {
    let x = null;
    // if (
    //   state !== "Available".toLowerCase() ||
    //   state !== "Not Available".toLowerCase()
    // ) {
    //   alert(state);

    //   toast.warning("State of stock should be Available or not available");
    //   return;
    // }

    if (state === "Available") {
      x = true;
    } else if (state === "not Available") {
      x = false;
    }

    const newCat = {
      item: item,
      quantity: quantity,
      state: x,
    };
    StockService.updateStock(stock._id, newCat);
    toast.success("Stock updated");
    loadStocks();

    window.location.reload();
  };

  const update = () => {
    try {
      updateStock();
    } catch (err) {
      toast.error("something went wrong!");
    }
  };
  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Update Medecine Stock </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={update}>
            <Form.Input
              label="item"
              type="text"
              placeholder={"item here ..."}
              name="item"
              maxLength="40"
              value={item || ""}
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
              label="quantity"
              type="number"
              placeholder={"quantity here ..."}
              name="quantity"
              maxLength="40"
              value={quantity || ""}
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
              label="state"
              type="text"
              placeholder={"state here ..."}
              name="state"
              maxLength="40"
              value={state}
              onChange={handleChangeCurrentState}
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
