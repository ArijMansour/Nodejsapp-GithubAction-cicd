import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import { Loader, Dimmer } from "semantic-ui-react";

export default function PharmacyPatient() {
  const history = useHistory();
  //loading
  const [loading, setLoading] = useState(false);

  const goToPharmacy = (e) => {
    e.preventDefault();

    return history.push("/signup");
  };

  const goToShipper = (e) => {
    e.preventDefault();

    return history.push("/signin-shipper");
  };

  const goToPatient = (e) => {
    e.preventDefault();

    return history.push("/signup-patient");
  };

  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader size="small">Loading</Loader>
        </Dimmer>
      ) : (
        <div className="h-full w-full py-16 px-4 bg-gray-100">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
              <div className="flex items-center justify-center">
                <img src={"assets/images/dwaya.png"} className="w-14 h-14" />
              </div>
              <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
                Who you are ?
              </p>
              <div className="mt-3 flex items-center">
                <button
                  onClick={(e) => goToPharmacy(e)}
                  className="text-black bg-gradient-to-br  outline-none bg-white border-gray-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-200 w-full
             dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  PHARMACITS
                </button>

                <button
                  onClick={(e) => goToPatient(e)}
                  className="text-black bg-gradient-to-br  outline-none bg-white border-red-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-200 w-full
             dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  PATIENT
                </button>
                <button
                  onClick={(e) => goToShipper(e)}
                  className="text-black bg-gradient-to-br  outline-none bg-white border-red-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-200 w-full
             dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  SHIPPER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
