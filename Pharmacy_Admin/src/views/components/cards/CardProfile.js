import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../app/redux/slices/UserSlice";
import user from "../../../assets/images/user-default.png";
import ModalChangeProfilePicture from "../profile/ModalChangeProfilePicture";
// components

export default function CardProfile() {
  const { id } = useParams();
  const [picture, setPicture] = useState();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [roleadmin, setRoleAdmin] = useState(null);
  const [rolepharmacy, setRolePharmacy] = useState(null);
  const [pharmacyAddress, setPharmacyAddress] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(id)).then((response) => {
      if (response.payload.id) {
        setIdUser(response.payload.id);
      }
      if (response.payload.username) {
        setUsername(response.payload.username);
      }

      if (response.payload.role === "ADMIN") {
        setRoleAdmin("ADMIN");
      }
      if (response.payload.role === "PHARMACY") {
        setRolePharmacy("PHARMACY");
        setPharmacyAddress(response.payload.pharmacyAddress);
      }

      if (response.payload.phone) {
        setPhone(response.payload.phone);
      }

      if (response.payload.email) {
        setEmail(response.payload.email);
      }
      if (response.payload.picture) {
        setPicture(response.payload.picture);
      }
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <ModalChangeProfilePicture id={id} picture={picture} />
              </div>
            </div>
            {/* <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center"></div>
              </div>
            </div> */}
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {username}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              Tunisia
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {roleadmin ? <>{roleadmin}</> : <>{rolepharmacy}</>}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Show more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
