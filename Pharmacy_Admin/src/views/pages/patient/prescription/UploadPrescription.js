import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useHistory } from "react-router-dom";
import * as moment from "moment";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SyncLoader from "react-spinners/SyncLoader";

import {
  register,
  SignUpAction,
  SignUpPatientAction,
} from "../../../../app/redux/actions/Auth";
import { connect, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import { isAuth } from "../../../../_helper/auth";
import { HiOutlinePhoneIncoming, HiPhone } from "react-icons/hi";
import { FiPhoneIncoming } from "react-icons/fi";
import { BsPhone } from "react-icons/bs";
import { MdPhone } from "react-icons/md";
import Dropzone from "react-dropzone-uploader";
import { CreatePrescription } from "../../../../app/redux/actions/PrescriptionAction";
import { PRESCRIPTION_CREATE_RESET } from "../../../../app/redux/types/PrescriptionType";
import { apiNotification } from "../../../../app/redux/actions/notificationAction";
import AddAdress from "../address/AddAdress";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

function UploadPrescription() {
  const dispatch = useDispatch();
  const [multiple_resources, SetMultiple_resources] = useState([]);
  const [notification, setNotifications] = useState([]);
  const [description, setDescription] = useState();
  const { id } = useParams();
  const socket = useRef();
  const history = useHistory();
  const [submitted, setSubmited] = useState("Sign up");

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const prescriptionCreate = useSelector(
    (state) => state.prescriptionCreateReducer
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    prescription: prescriptionCreated,
  } = prescriptionCreate;

  useEffect(() => {
    socket.current = io("http://localhost:8800");

    dispatch({ type: PRESCRIPTION_CREATE_RESET });

    if (successCreate) {
      history.push("/my-prescription");
    } else {
      //dispatch(listPrescription());
      // alert("here is data ");
    }
  }, [
    dispatch,
    history,
    // successDelete,
    successCreate,
    prescriptionCreated,
  ]);

  const createPrescriptionHandler = () => {
    dispatch(CreatePrescription());
  };
  const uploadPHandler = (e) => {
    e.preventDefault();
    if (multiple_resources.length === 0) {
      toast.error("please add your pictures of your prescription");
      return;
    }

    dispatch(CreatePrescription(description, multiple_resources, id)).then(
      (res) => {
        console.log("****");
        console.log(res);

        let notifData = {
          Owner: isAuth().id,
          Message:
            isAuth().firstName + "sent you prescription click to see details",

          Pharmacy: id,
          Prescription: localStorage.getItem("presc"),
        };

        const res2 = apiNotification.addNotification(notifData);
        socket.current.emit("addNewNotification", id);
        console.log(res2);

        //   window.location.reload();

        // remove item presc
        localStorage.removeItem("presc");
      }
    );
  };

  //HANDLE CHANGE PICTURE STATE :

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      SetMultiple_resources((state) => [...state, file]);
    }
    if (status === "removed") {
      let multiple_resource = multiple_resources.slice();
      multiple_resource = multiple_resources.filter((u) => {
        return u !== file;
      });
      SetMultiple_resources(multiple_resource);
    }
  };

  return (
    <>
      <div className="h-full w-full py-16 px-4 bg-gray-100">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-5xl">
            <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
              Upload Prescription{" "}
            </p>

            {loadingCreate ? (
              <div className="loading">
                <SyncLoader
                  color={"#1e1e2c"}
                  loading={loadingCreate}
                  size={40}
                />
              </div>
            ) : (
              <form
                className="px-6 py-6 w-full"
                onSubmit={(e) => uploadPHandler(e)}
                noValidate
              >
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Please upload images of your prescription.
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    {/* <Link>What is a valid prescription?</Link> */}
                  </AlertDescription>
                </Alert>
                <div className="mt-2 w-full">
                  <Dropzone
                    styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
                    onChangeStatus={handleChangeStatus}
                  />
                </div>

                <div className="mt-2 w-full">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Note
                  </label>
                  <Textarea
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Note for the pharmacist"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-2 w-full">
                  <List spacing={3}>
                    <ListItem>
                      <label>Phone Number: </label>
                      <span>{isAuth().phone}</span>
                    </ListItem>
                  </List>
                  <List spacing={3}></List>
                </div>
                <div className="mt-6">
                  <button className="flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-blue-600 border border-transparent rounded-full md:w-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:blue-indigo-600">
                    {" "}
                    Send Prescription
                  </button>
                </div>
                {/* <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Don't have account? {""}
                <Link to="/signin">
                  <span className="text-sm font-medium leading-none underline text-blue-700 cursor-pointer">
                    {""}
                    Sign in here
                  </span>
                </Link>
              </p> */}
              </form>
            )}
            {}
          </div>
        </div>
      </div>
    </>
  );
}

//norbot reducers b component

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
export default connect(mapStateToProps)(UploadPrescription);
