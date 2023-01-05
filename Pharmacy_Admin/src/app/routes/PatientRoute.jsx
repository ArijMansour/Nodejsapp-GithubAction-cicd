import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isAuth } from "../../_helper/auth";
import Nav from "../../views/components/patient/Nav/Nav";
import FooterPatient from "../../views/components/patient/footer/FooterPatient";

const PatientRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === "PATIENT" ? (
        <>
          <Nav /> <Component {...props} />
          <FooterPatient />
        </>
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

PatientRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PatientRoute);
