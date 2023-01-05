import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import StockService from "../../../../infrastructure/services/api/StockService";
import { isAuth } from "../../../../_helper/auth";

export default function AddStockModal({ isOpen, close }) {
  const [formClassName, SetFormClassName] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [state, setState] = useState(true);
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {}, []);

  const handleChangeItemCurrent = (e) => {
    e.preventDefault();
    setItem(e.target.value);
  };
  const handleQuantityCurrent = (e) => {
    e.preventDefault();

    setQuantity(e.target.value);
  };

  const handleStateChangeCurrent = (e) => {
    e.preventDefault();

    setState(e.target.value);
  };
  const [stocks, setStocks] = useState([]);
  const loadStocks = () =>
    StockService.myStock().then((c) => setStocks(c.data));

  useEffect(() => {
    loadStocks();
  }, []);

  const addStock = () => {
    // alert(item);
    // alert(quantity);
    if (item.length === 0 || quantity === 0) {
      toast.error("All fields are required");
      return;
    }

    StockService.createStock({
      item: item,
      quantity: quantity,
      state: true,
    }).then((res) => {
      if (res.data.success === false) {
        toast.warning(res.data.message);
        return;
      } else {
        loadStocks();
        toast.success("Stock added");
        window.location.reload();
      }
    });
  };

  function add() {
    try {
      addStock();
    } catch (err) {
      toast.error("something went wrong!");
    }
  }

  return (
    <div>
      <Modal onClose={close} onOpen={isOpen} open={isOpen} size="mini">
        <Modal.Header>Add Stock </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} onSubmit={addStock} noValidate>
            <Form.Input
              label="item"
              type="text"
              placeholder={"name here ..."}
              name="item"
              maxLength="40"
              required
              onChange={handleChangeItemCurrent}
            />

            <Form.Input
              label="quantity"
              type="number"
              placeholder={"number here ..."}
              name="quantity"
              required
              onChange={handleQuantityCurrent}
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
