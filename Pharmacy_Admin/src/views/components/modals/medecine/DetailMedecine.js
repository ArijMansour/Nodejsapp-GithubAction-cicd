import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Alert,
  Spinner,
  Form,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  GetCategory,
  GetMedecinesById,
} from "../../../../app/redux/slices/MedecineSlice";

export default function DetailMedecine() {
  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm();

  const id = useParams();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [roleadmin, setRoleAdmin] = useState(null);
  const [rolepharmacy, setRolePharmacy] = useState(null);
  const [pharmacyAddress, setPharmacyAddress] = useState();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [picture, setPicture] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [iduser, setIdUser] = useState();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentMedecine, setCurrentMedecine] = useState({});
  const [arrayImg, setArrayImg] = useState([]);
  useEffect(() => {
    dispatch(GetMedecinesById(id.id)).then((response) => {
      const arr = [];

      const data = {
        category: response.payload.category,
      };
      const d = data.category;
      dispatch(GetCategory(data)).then((re) => {});

      setCurrentMedecine({
        name: response.payload.name,
        price: `${response.payload.price} DT`,
        description: response.payload.description,
        expiresDate: response.payload.expiresDate.split("T")[0],
        countInStock: response.payload.countInStock,
        multiple_resources: response.payload.multiple_resources,
        category: response.payload.category,
      });

      for (let i = 0; i < response.payload.multiple_resources.length; i++) {
        arr.push(response.payload.multiple_resources[i]["url"]);
      }
      setArrayImg(arr);

      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Detail Medecine
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {" "}
          {loading ? (
            <div className="ui active centered  loader flex items-center justify-center"></div>
          ) : (
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Medecine Detail
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      //   defaultValue={name}
                      //   onChange={handlenameChange}
                      defaultValue={currentMedecine["name"]}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      //   defaultValue={name}
                      //   onChange={handlenameChange}
                      defaultValue={currentMedecine["price"]}
                    />
                  </div>
                </div>
              </div>{" "}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      //   defaultValue={name}
                      //   onChange={handlenameChange}
                      defaultValue={currentMedecine["category"]}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="category"
                    >
                      Count in stock
                    </label>
                    <input
                      type="text"
                      name="category"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      //   defaultValue={name}
                      //   onChange={handlenameChange}
                      defaultValue={currentMedecine["countInStock"]}
                    />
                  </div>
                </div>
              </div>
              <div className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="expiresDate"
                    >
                      Expire Date
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={currentMedecine["expiresDate"]}
                      name="expiresDate"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      //   onChange={handlePhoneChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Pictures
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      rows="20"
                      cols="20"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={currentMedecine["description"]}
                      //   onChange={handleEmailChange}
                    />
                  </div>
                  <br />
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Pictures
                    </label>

                    <div className=" min-w-0   justify-center bg-white w-full mb-6 shadow-lg rounded">
                      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                          <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Pictures :{" "}
                          </h6>
                          <div
                            className="flex items-center justify-center container px-4 mx-auto 
"
                          >
                            {arrayImg.map((el) => (
                              <img src={el} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
