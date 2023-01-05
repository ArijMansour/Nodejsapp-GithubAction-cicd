import React, { useEffect } from "react";

import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpdateProfile from "./views/components/profile/UpdateProfile";
import Admin from "./views/Layout/admin/Admin";
import Pharmacy from "./views/Layout/pharmacy/Pharmacy";
import Chat from "./views/pages/Chat/Chat";
import ConfirmEmail from "./views/pages/confirmemail/ConfirmEmail";
import ForgetPassword from "./views/pages/forgetpassword/ForgetPassword";
import ApproveRequest from "./views/pages/request/ApproveRequest";
import ResetPassword from "./views/pages/resetpassword/ResetPassword";
import SignIn from "./views/pages/signin/SignIn";
import SignUp from "./views/pages/signup/SignUp";
import { isAuth } from "./_helper/auth";
import "./App.css";
import "./views/pages/patient/style-client.css";
import Home from "./views/pages/Home";
import Profile from "./views/pages/Profile/Profile";
import { useSelector } from "react-redux";
import PrivateRoute from "./app/routes/PrivateRoute";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import PatientRoute from "./app/routes/PatientRoute";
import SignUpPatient from "./views/pages/patient/signup/SignUpPatient";
import PharmacyPatient from "./views/pages/pharmacy-patient/PharmacyPatient";
import HomePatient from "./views/pages/patient/home/HomePatient";
import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./views/admin/dashboard/Dashboard";
import NotFoundPage from "./views/pages/not-found/NotFoundPage";
import Cartpage from "./views/pages/patient/cart/Cartpage";
import Nav from "./views/components/patient/Nav/Nav";
import FooterPatient from "./views/components/patient/footer/FooterPatient";
import MedicineDetail from "./views/components/patient/medicine/MedicineDetail";
import Checkout from "./views/pages/patient/checkout/Checkout";
import UploadPrescription from "./views/pages/patient/prescription/UploadPrescription";
import MyPrescription from "./views/pages/patient/prescription/MyPrescription";
import DetailPrescriptions from "./views/pages/patient/prescription/DetailPrescriptions";
import ListPaharamcies from "./views/pages/patient/address/ListPaharamcies";
import Notification from "./views/components/notification/Notification";
import Placeorder from "./views/pages/patient/place-order/Placeorder";
import Order from "./views/pages/patient/order/Order";
import ProfilePatient from "./views/pages/patient/profile/ProfilePatient";
import SignInShipper from "./views/pages/shipper/signin/SignInShipper";
import ShipperDashboard from "./views/pages/shipper/dashboard/ShipperDashboard";
import ShipperOrders from "./views/pages/shipper/dashboard/go/ShipperOrders";
import CalculateRoute from "./views/pages/shipper/dashboard/go/CalculateRoute";

// import Chatbot from "./components/chatbot/Chatbot";
// Setup Redux store with Thunks
//const reducers = combineReducers({ items });
//const store = createStore(reducers, applyMiddleware(thunk));

const value = true;

const App = () => {
  //const user = useSelector((state) => alert(JSON.stringify(state.auth)));
  const token = Cookies.get("token");
  if (token) {
    var decoded = jwt_decode(token);
  } else var decoded = "";
  return (
    <div className="main">
      <ChakraProvider>
        <div className="App">
          {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Switch>
            {/* <Route path="/chats" exact component={Profile} /> */}
            <Route path="/home" exact component={Home} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/check" exact component={PharmacyPatient} />
            <Route path="/signin-shipper" exact component={SignInShipper} />

            <Route path="/signup-patient" exact component={SignUpPatient} />
            <Route path="/pharmacy/dashboard" exact component={Pharmacy} />
            <Route path="/admin/dashboard" exact component={Admin} />
            <Route
              path="/shipper/dashboard"
              exact
              component={ShipperDashboard}
            />

            <Route path="/shipper/orders" exact component={ShipperOrders} />
            <Route path="/shipper/routes" exact component={CalculateRoute} />


            <PrivateRoute path="/chat" exact component={Chat} />
            <Route path="/notifications" exact component={Notification} />
            <PatientRoute path="/" exact component={HomePatient} />
            <PatientRoute
              path="/available-pharmacies"
              exact
              component={ListPaharamcies}
            />
            <PatientRoute
              path="/upload-prescription/:id"
              exact
              component={UploadPrescription}
            />
            <PatientRoute
              path="/profile-patient"
              exact
              component={ProfilePatient}
            />
            <PatientRoute
              path="/my-prescription"
              exact
              component={MyPrescription}
            />
            <PatientRoute
              path="/medicine/:id"
              exact
              component={MedicineDetail}
            />
            <PatientRoute path="/cart" exact component={Cartpage} />
            <PatientRoute path="/shipping" exact component={Checkout} />
            <Route
              path="/signup"
              exact
              render={(props) => <SignUp {...props} />}
            />
            <Route
              path="/signin"
              exact
              render={(props) => <SignIn {...props} />}
            />
            <Route
              path="/resetpassword/:token"
              exact
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              path="/forgotpassword"
              exact
              render={(props) => <ForgetPassword {...props} />}
            />
            <Route
              path="/activate/:token"
              exact
              render={(props) => <ConfirmEmail {...props} />}
            />
            {/* <AdminRoute path="/" exact component={Admin} /> */}
            <Route
              path="/pharmacy/approveRequest/:token/:status"
              exact
              render={(props) => <ApproveRequest {...props} />}
            />
            <PatientRoute path="/shipping/placeorder" component={Placeorder} />
            <PatientRoute path="/order/:id" component={Order} />

            {/* {isAuth().role === "ADMIN" &&
              isAuth().role === "PATIENT" &&
              isAuth().role === "PHARMACY" && (
                <Route component={NotFoundPage} />
              )} */}
            {isAuth() && isAuth().role === "ADMIN" ? <Admin /> : <Pharmacy />}
          </Switch>{" "}
        </div>
      </ChakraProvider>
    </div>
  );
};
export default App;
