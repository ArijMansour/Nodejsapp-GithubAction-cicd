import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MedecineService from "../../../infrastructure/services/api/MedecineService";
import Datatable from "../Datatable/DatatableCategory";
import AddMedecine from "../modals/medecine/AddMedecineModal";
import UpdateMedecineModal from "../modals/medecine/UpdateMedecineModal";
import DatatableMedecine from "../Datatable/DatatableMedecine";

export default function CardTableMedecines({ color }) {
  const [medecines, setMedecines] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const [values, setValues] = useState("");
  const loadMedecines = () =>
    //MedecineService.getMedecines().then((c) => setMedecines(c.data));
    useEffect(() => {
      // loadMedecines();
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
      MedecineService.removeMedecine(id)
        .then((res) => {
          //       setLoading(false);
          alert(`${res.data.name} deleted`);
          loadMedecines();
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
    return MedecineService.searchMedecine(`${values}`)
      .then((response) => {
        alert(JSON.stringify(response));
        setMedecines(response.data);
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
                Medecine list
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
              <i className="fa fa-plus"></i> Add Medecine medecine
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Add medecine */}
          {<AddMedecine isOpen={isOpen} close={closeModal} />}

          <div className="px-8">
            <DatatableMedecine />
          </div>
                </div>
      </div>
    </>
  );
}
CardTableMedecines.defaultProps = {
  color: "light",
};

CardTableMedecines.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
