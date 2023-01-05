import React, { useState, useEffect } from "react";
import CategoryService from "../../../infrastructure/services/api/CategoryService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import UpdateCategoryModal from "../modals/category/UpdateCategoryModal";
import { isAuth } from "../../../_helper/auth";
function DatatableCategory() {
  const MySwal = withReactContent(Swal);

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  //GET CURRENT DATA
  const getCategory = async (id) => {
    await CategoryService.getCategory(id).then((c) => {
      setCategory(c.data);
      setLoading(false);
    });
  };

  function openModal(id, e) {
    e.preventDefault();
    getCategory(id);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //LOAD DATA
  const loadCategories = () => {
    CategoryService.getCategories()
      .then((c) => {
        
        console.log(c);

        setCategories(c.data);

        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    loadCategories();
  }, []);

  // POPUP SWEET ALERT

  const handleRemove = (record, id, e) => {
    e.preventDefault();

    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this category!",
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
        CategoryService.removeCategory(record._id).then((res) => {
          MySwal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your category has been deleted.",
            customClass: {
              confirmButton:
                "text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
            },
            buttonsStyling: false,
          });
        });
        loadCategories();
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your category is safe :)",
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

  const data = categories.map(({ body, ...item }) => ({
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
              {/* Update category */}
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
      ></Table>
      <UpdateCategoryModal
        isOpen={isOpen}
        close={closeModal}
        category={category}
      />
    </>
  );
}

export default DatatableCategory;
