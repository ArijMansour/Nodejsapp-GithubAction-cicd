import { Button, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listOrders } from "../../../../../app/redux/actions/orderActions";
import { ORDER_LIST_SUCCESS } from "../../../../../app/redux/types/orderType";
import { API_URL } from "../../../../../infrastructure/services/api/ApiUrl";
import { isAuth } from "../../../../../_helper/auth";
import DatatableOrders from "../../../../components/Datatable/DatatableOrders";

function ShipperOrders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      {" "}
      <div className="grid h-screen place-items-center bg-gray-100">
        <DatatableOrders />
      </div>
    </div>
  );
}

export default ShipperOrders;
