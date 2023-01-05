import React, { useState, useEffect } from "react";
import MedecineService from "../../../infrastructure/services/api/MedecineService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import UpdateMedecineModal from "../modals/medecine/UpdateMedecineModal";
import { Link } from "react-router-dom";
import moment from "moment";

function DatatableMedecine() {
  const MySwal = withReactContent(Swal);

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const [medecine, setMedecine] = useState({});
  const [medecines, setMedecines] = useState([]);
  //GET CURRENT DATA
  const getMedecine = async (id) => {
    await MedecineService.getMedecine(id).then((c) => {
      setMedecine(c.data);
      setLoading(false);
    });
  };

  function openModal(id, e) {
    e.preventDefault();
    getMedecine(id);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //LOAD DATA
  const loadMedecines = () =>
    MedecineService.getMedecines().then((c) => {
      if (c.data.length > 0) {
        setMedecines(c.data);

        setLoading(false);
      }
    });
  useEffect(() => {
    loadMedecines();
  }, []);

  // POPUP SWEET ALERT

  const handleRemove = (record, id, e) => {
    e.preventDefault();

    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Medecine!",
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
        MedecineService.removeMedecine(record._id).then((res) => {
          MySwal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your Medecine has been deleted.",
            customClass: {
              confirmButton:
                "text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
            },
            buttonsStyling: false,
          });

          window.location.reload();

          loadMedecines();
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your Medecine is safe :)",
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

  const data = medecines.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    message: body,
  }));

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      editTable: true,
      align: "center",
    },
    {
      title: "price",
      dataIndex: "price",
      editTable: true,
      align: "center",
    },
    {
      title: "expiresDate",
      dataIndex: "expiresDate",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{moment(record.expiresDate).format("YYYY-MM-DD")}</>;
      },
    },

    {
      title: "typeMedicine",
      dataIndex: "typeMedicine",
      editTable: true,
      align: "center",
      render: (_, record) => {
        return <>{record.typeMedicine}</>;
      },
    },

    //
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
              <i className="fa fa-pen text-white" />
            </button>
            <button
              onClick={(e) => handleRemove(record, record._id, e)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              //record is the row data
            >
              {/* Update Medecine */}
              <i className="fas fa-trash text-white" />
            </button>
            <Link to={`/medecine/detail/${record._id}`}>
              <button
                // onClick={(e) => detailMedecine(record, record._id, e)}
                className="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:gray-red-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                //record is the row data
              >
                {/* Update Medecine */}
                <i className="fas fa-bars text-white" />
              </button>
            </Link>
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
      ></Table>

      <UpdateMedecineModal
        isOpen={isOpen}
        close={closeModal}
        medecine={medecine}
      />
    </>
  );
}

export default DatatableMedecine;
