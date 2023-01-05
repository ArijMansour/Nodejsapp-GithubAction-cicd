import React, { useState, useEffect } from "react";
import PrescriptionService from "../../../infrastructure/services/api/PrescriptionService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import { isAuth } from "../../../_helper/auth";
import { DeletePrescription } from "../../../app/redux/actions/PrescriptionAction";
import { useDispatch, useSelector } from "react-redux";
function DatatablePrescription() {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();

  //PRESCIRPTION DELETE :

  const prescriptionDelete = useSelector((state) => state.prescriptionDelete);
  
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = prescriptionDelete;

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const [prescriptions, setPrescriptions] = useState([]);
  //GET CURRENT DATA
  const getPrescription = async () => {
    await PrescriptionService.getPrescriptions().then((c) => {
      setPrescriptions(c.data);
      setLoading(false);
    });
  };

  function openModal(id, e) {
    e.preventDefault();
    getPrescription(id);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //LOAD DATA
  const loadPrescriptions = () => {
    PrescriptionService.getPrescriptions()
      .then((c) => {
        console.log(c);

        setPrescriptions(c.data);

        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    loadPrescriptions();
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

  const data = prescriptions.map(({ body, ...item }) => ({
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
      title: "patient",
      dataIndex: "patient",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.patient.username}</>;
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
      title: "phone",
      dataIndex: "phone",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.patient.phone}</>;
      },
    },
    {
      title: "picture",
      dataIndex: "multiple_resources",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <img
              style={{ width: "50%", height: "50%" }}
              src={record.multiple_resources[0].url}
            />
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
              <i className="fa fa-check text-white" />{" "}
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
      {/* <UpdatePrescriptionModal
        isOpen={isOpen}
        close={closeModal}
        Prescription={Prescription}
      /> */}
    </>
  );
}

export default DatatablePrescription;
