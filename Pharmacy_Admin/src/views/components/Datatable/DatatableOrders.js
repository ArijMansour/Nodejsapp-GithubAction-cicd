import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import { isAuth } from "../../../_helper/auth";
import { DeletePrescription } from "../../../app/redux/actions/PrescriptionAction";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../../app/redux/actions/orderActions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import Cookies from "js-cookie";
import { Button, Icon, Item, Label, Modal, Select } from "semantic-ui-react";
import { toast } from "react-toastify";
export default function DatatableOrders() {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();

  const history = useHistory();
  //PRESCIRPTION DELETE :

  const prescriptionDelete = useSelector((state) => state.prescriptionDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = prescriptionDelete;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  function openModal(id, e) {
    e.preventDefault();
    getPrescription(id);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const assign = (id, phone) => {
    axios
      .put(
        `${API_URL}/orders/assignToShipper`,
        {
          _id: id,
          phone: phone,
        },
        { headers: { Authorization: `${Cookies.get("token")}` } }
      )
      .then((res) => {
        if (res.data.exist) {
          toast.warning(res.data.message);
        }
        else {
          toast.success(res.data.message);

        }
      });
  };

  // const asyync = async () => {
  //   await axios
  //     .get(`${API_URL}/user/getShippers`, {
  //       headers: { Authorization: `${Cookies.get("token")}` },
  //     })
  //     .then((res) => {
  //       setShippers(res.data);
  //     });
  // };

  const [shippers, setShippers] = useState([]);
  useEffect(() => {
    if (isAuth() && isAuth().role === "PHARMACY") {
      dispatch(listOrders()).then((res) => {
        setOrders(res);
      });
    } else {
      history.push("/signin");
    }

    axios
      .get(`${API_URL}/user/getShippers`, {
        headers: { Authorization: `${Cookies.get("token")}` },
      })
      .then((res) => {
        setShippers(res.data);
      });
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
        dispatch(DeletePrescription(record._id));

        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Prescription has been deleted.",
          customClass: {
            confirmButton:
              "text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
          },
          buttonsStyling: false,
        });

        // loadPrescriptions();
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your Prescription is safe :)",
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

  const data = orders.map(({ body, ...item }) => ({
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
      title: "user",
      dataIndex: "user",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.user.username}</>;
      },
    },
    {
      title: "Address",
      dataIndex: "user",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return (
          <p className="text-left">
            <span className="text-black">City :</span>
            {record.shippingAddress.city}
            <br />
            <span className="text-black">State :</span>
            {record.shippingAddress.state}
            <br />
            <span className="text-black">Zip :</span>

            {record.shippingAddress.zip}
            <br />
            <span className="text-black">Country :</span>

            {record.shippingAddress.country}
            <br />
          </p>
        );
      },
    },
    // {
    //   title: "address", //A VOIRE

    //   dataIndex: "address",
    //   editTable: true,
    //   align: "center",
    //   render: (_, record) => {
    //     return <>{record.patient.address}</>;
    //   },
    // },
    {
      title: "date",
      dataIndex: "date",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.createdAt.substring(0, 10)}</>;
      },
    },
    {
      title: "total",
      dataIndex: "total",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.totalPrice}</>;
      },
    },
    {
      title: "Paid",
      dataIndex: "Paid",
      editTable: false,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record.isPaid ? (
              <div className="paid">{record.paidAt.substring(0, 10)}</div>
            ) : (
              <div className="notpaid">NO</div>
            )}
          </>
        );
      },
    },
    {
      title: "Delieverd",
      dataIndex: "Delieverd",
      editTable: false,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {record.isDelivered ? (
              <div className="paid">{record.deliveredAt.substring(0, 10)}</div>
            ) : (
              <div className="notpaid">NO</div>
            )}
          </>
        );
      },
    },
    {
      title: "Assign",
      dataIndex: "Assign",
      editTable: false,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {isAuth().role === "SHIPPER" ? (
              <div className="notpaid">
                <button className="relative inline-flex items-center w-full justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Deliever
                  </span>
                </button>
              </div>
            ) : (
              <div className="notpaid">
                <button
                  onClick={() => setFirstOpen(true)}
                  className="relative inline-flex items-center w-full justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Assign to delievery
                  </span>
                </button>

                <Modal
                  onClose={() => setFirstOpen(false)}
                  onOpen={() => setFirstOpen(true)}
                  open={firstOpen}
                >
                  <Modal.Header>Shippers arround Tunisia</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>
                        {/* <select>
                {shippers.map((item) => (
                  <>
                    <option value={item.firstName}></option>
                  </>
                ))}
              </select> */}
                      </p>
                      <Item.Group divided>
                        {shippers.map((item) => (
                          <Item>
                            <Item.Content>
                              <Item.Header as="a">
                                FullName:{} {item.firstName} {""}{" "}
                                {item.lastName}
                              </Item.Header>
                              <Item.Meta>
                                Location:{" "}
                                <span className="cinema font-bold text-base">
                                  {item.city}
                                </span>
                              </Item.Meta>
                              <Item.Meta>
                                Phone:{" "}
                                <span className="cinema font-bold text-base">
                                  {item.phone}
                                </span>
                              </Item.Meta>

                              <Item.Extra>
                                <Button
                                  onClick={() => {
                                    assign(record.id, item.phone);
                                  }}
                                  primary
                                  floated="right"
                                >
                                  Assign
                                  <Icon name="right chevron" />
                                </Button>
                                <Label>Available</Label>
                              </Item.Extra>
                            </Item.Content>
                          </Item>
                        ))}
                      </Item.Group>
                    </Modal.Description>
                  </Modal.Content>

                  <Modal
                    onClose={() => setSecondOpen(false)}
                    open={secondOpen}
                    size="small"
                  >
                    <Modal.Header>Modal #2</Modal.Header>
                    <Modal.Content>
                      <p>That's everything!</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        icon="check"
                        content="All Done"
                        onClick={() => setSecondOpen(false)}
                      />
                    </Modal.Actions>
                  </Modal>
                </Modal>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
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

      {/* <UpdatePrescriptionModal
        isOpen={isOpen}
        close={closeModal}
        Prescription={Prescription}
      /> */}
    </>
  );
}
