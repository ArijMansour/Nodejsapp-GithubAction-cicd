import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import StockService from "../../../infrastructure/services/api/StockService";
import DatatableStock from "../Datatable/DatatableStock";
import { isAuth } from "../../../_helper/auth";
import AddStockModal from "../modals/stock/AddStockModal";

export default function CardTableStocks({ color }) {
  const [Stocks, setStocks] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const [values, setValues] = useState("");
  const loadStocks = () => {
    StockService.getStocks().then((c) => setStocks(c.data));
  };
  useEffect(() => {
    loadStocks();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleRemove = async (id) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      //   setLoading(true);
      StockService.removeStock(id)
        .then((res) => {
          //       setLoading(false);
          alert(`${res.data.name} deleted`);
          loadStocks();
        })
        .catch((err) => {
          //     setLoading(false);
          alert(err.response.data);
        });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setValues(e.target.value);
    return StockService.searhStock(`${values}`)
      .then((response) => {
        alert(JSON.stringify(response));
        setStocks(response.data);
        setValues("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Stock list
              </h3>
            </div>
            {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"></span>
                <input
                  type="text"
                  placeholder="Search here..."
                  name="search"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative    bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                  value={values}
                  onChange={handleSearch}
                />
              </div>
              .
            </form> */}
            <button
              onClick={openModal}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <i className="fa fa-plus"></i> Add Medecine Stock
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Add Stock */}
          {<AddStockModal isOpen={isOpen} close={closeModal} />}

          <div className="px-8">
            <DatatableStock />
          </div>
          {/* Projects table */}
          {/* <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  name
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Actions
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
              </tr>
            </thead>

            <tbody>
              {Stocks.length === 0 ? (
                <>
                  <span>Stocks EMPTY</span>
                </>
              ) : (
                Stocks.map((val, index) => {
                  return (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light"
                              ? "text-blueGray-600"
                              : "text-white")
                          }
                        >
                          <div key={index}>
                            <h3>{val.name}</h3>
                          </div>
                        </span>
                      </th>
                      {/* "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2", */}

          {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={() => setOpenPopup(true)}
                          className="bg-lightGrey-500 active:bg-lightBlue-600 uppercase 
                         text-white font-bold hover:shadow-md shadow text-xs px-3 py-1 
                         rounded outline-none focus:outline-none sm:mr-1 mb-1  transition-all duration-150"
                        >
                          <i class="fas fa-plus-square"></i>
                        </button>

                        <button
                          onClick={() => handleRemove(val._id)}
                          className="bg-lightGrey-500 active:bg-lightBlue-600 uppercase 
                    text-white font-bold hover:shadow-md shadow text-xs px-3 py-1 
                    rounded outline-none focus:outline-none sm:mr-1 mb-1  transition-all duration-150"
                          type="button"
                          class="fas fa-trash"
                        ></button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table> */}
          {/* <PopupStock
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          ></PopupStock> */}
        </div>
      </div>
    </>
  );
}
CardTableStocks.defaultProps = {
  color: "light",
};

CardTableStocks.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
