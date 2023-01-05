import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../../components/Navbar/AdminNavbar";
import Sidebar from "../../components/sidebar/Sidebar";

// views
import Dashboard from "../../../views/admin/dashboard/Dashboard";
import HeaderStats from "../../components/header/HeaderStats";
import FooterAdmin from "../../components/footers/Footer";
import UpdateProfile from "../../components/profile/UpdateProfile";
import TablesCategory from "../pharmacy/category/TablesCategory";
export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route
              path="/admin/dashboard"
              exact
              render={(props) => <Dashboard {...props} />}
            />{" "}
            <Route
              path="/updateProfile/:id"
              exact
              render={(props) => <UpdateProfile {...props} />}
            />{" "}
            <Route path="/category" exact component={TablesCategory} />
            {/* <Route path="/updateProfile/:id" exact component={UpdateProfile} /> */}
            {/* <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/TablesHospital" exact component={TablesHospital} />
            <Route path="/admin/TablesChats" exact component={TablesChats} />
            <Route path="/admin/tablesReview" exact component={TablesForum} /> */}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
