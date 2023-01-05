import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../../components/Navbar/AdminNavbar";
import Sidebar from "../../components/sidebar/Sidebar";

// views
import Dashboard from "../../../views/admin/dashboard/Dashboard";
import HeaderStats from "../../components/header/HeaderStats";
import FooterAdmin from "../../components/footers/Footer";
import TablesCategory from "../../Layout/pharmacy/category/TablesCategory";
import TablesMedecine from "../../Layout/pharmacy/medecine/TablesMedecine";
import UpdateProfilePharmacy from "../../components/profile/UpdateProfilePharmacy";
import DetailMedecine from "../../../views/components/modals/medecine/DetailMedecine";
import Notification from "../../components/notification/Notification";
import TablesPrescription from "./prescription/TablesPrescription";
import TablesStock from "./stock/TableStock";
import DatatableOrders from "../../components/Datatable/DatatableOrders";
import TablesOrders from "./orders/TablesOrders";
import TableShipper from "../shipper/TableShipper";
export default function Pharmacy() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />

            <Route
              path="/updateProfilePharmacy/:id/:idAddress"
              exact
              render={(props) => <UpdateProfilePharmacy {...props} />}
            />
            <Route
              path="/medecine/detail/:id"
              exact
              render={(props) => <DetailMedecine {...props} />}
            />

            <Route path="/medecines" exact component={TablesMedecine} />
            <Route path="/prescriptions" exact component={TablesPrescription} />
            <Route path="/stocks" exact component={TablesStock} />
            <Route path="/orders" exact component={TablesOrders} />
            <Route path="/shippers" exact component={TableShipper} />

            {/* <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/TablesHospital" exact component={TablesHospital} />
            <Route path="/admin/TablesChats" exact component={TablesChats} />
            <Route path="/admin/tablesReview" exact component={TablesForum} /> */}
            {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
