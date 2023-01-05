import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import { isAuth } from "../../../_helper/auth";
import { useDispatch, useSelector } from "react-redux";
import StockService from "../../../infrastructure/services/api/StockService";
import { DeleteStock } from "../../../app/redux/actions/StockAction";
import axios from "axios";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import UpdateStockModal from "../modals/stock/UpdateStockModal";
function DatatablePrescription() {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();

  //PRESCIRPTION DELETE :

  const stockDelete = useSelector((state) => state.stockDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stockDelete;

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [stock, setStock] = React.useState({});

  const [stocks, setStocks] = useState([]);
  //GET CURRENT DATA
  const getstock = async () => {
    await StockService.getStocks().then((c) => {
      setStocks(c.data);
      setLoading(false);
    });
  };

  function openModal(id, e) {
    e.preventDefault();

    axios.get(`${API_URL}/stock/getStock/${id}`).then((res) => {
      setStock(res.data);
    });

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //LOAD DATA
  const loadStocks = () => {
    StockService.getStocks()
      .then((c) => {
        setStocks(c.data);

        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    loadStocks();
  }, [successDelete, dispatch]);

  // POPUP SWEET ALERT

  const handleRemove = (record, id, e) => {
    e.preventDefault();

    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Prescription!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton:
          "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",

        cancelButton:
          "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        dispatch(DeleteStock(record._id));

        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Stock has been deleted.",
          customClass: {
            confirmButton:
              "text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
          },
          buttonsStyling: false,
        });

        // loadStocks();
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your Stock is safe :)",
          icon: "error",
          customClass: {
            confirmButton:
              "text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
          },
          buttonsStyling: false,
        });
      }
    });
  };
  const handleUpdate = (record, id, e) => {
    e.preventDefault();
  };

  const data = stocks.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    message: body,
  }));

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      editTable: true,
      align: "center",
    },
    {
      title: "item",
      dataIndex: "item",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.item}</>;
      },
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <span className="font-bold text-xl text-green-700 ">
              {record.quantity}
            </span>
          </>
        );
      },
    },
    {
      title: "state",
      dataIndex: "state",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record.state === true ? (
              <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">
                AVAILABLE
              </span>
            ) : (
              <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">
                OUT OF STOCK{" "}
              </span>
            )}
          </>
        );
      },
    },

    {
      title: "action",
      dataIndex: "action",
      editTable: false,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <button
              className="text-white bg-gradient-to-r from-lightBlue-400 via-lightBlue-500 to-lightBlue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lightBlue-300 dark:focus:ring-lightBlue-800 shadow-lg shadow-lightBlue-500/50 dark:shadow-lg dark:shadow-lightBlue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              //record is the row data
              onClick={(e) => openModal(record._id, e)}
            >
              <i className="fa fa-pen text-white" />{" "}
            </button>
            <button
              onClick={(e) => handleRemove(record, record._id, e)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              //record is the row data
            >
              {" "}
              {/* Update Prescription */}
              <i className="fas fa-trash text-white" />
            </button>

            {JSON.stringify(stock)}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        bordered
        loading={loading}
        pagination={{
          defaultPageSize: 3,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      ></Table>
      <UpdateStockModal isOpen={isOpen} close={closeModal} stock={stock} />
    </>
  );
}

export default DatatablePrescription;
