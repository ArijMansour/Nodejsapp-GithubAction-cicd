// import React, { useEffect, useRef, useState } from "react";
// import {
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Textarea,
//   Button,
//   InputRightElement,
// } from "@chakra-ui/react";
// import { BsEnvelope, BsSearch } from "react-icons/bs";
// import { HiSearch } from "react-icons/hi";
// import { MdGpsFixed } from "react-icons/md";

// const apiKey = "AIzaSyDJqKQDJ5WtannWAwYWUbSPmNi5MDbaX48";
// const mapApiJs = "https://maps.googleapis.com/maps/api/js";
// const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// // load google map api js

// function loadAsyncScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     Object.assign(script, {
//       type: "text/javascript",
//       async: true,
//       src,
//     });
//     script.addEventListener("load", () => resolve(script));
//     document.head.appendChild(script);
//   });
// }

// const extractAddress = (place) => {
//   const address = {
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     plain() {
//       const city = this.city ? this.city + ", " : "";
//       const zip = this.zip ? this.zip + ", " : "";
//       const state = this.state ? this.state + ", " : "";
//       return city + zip + state + this.country;
//     },
//   };

//   if (!Array.isArray(place?.address_components)) {
//     return address;
//   }

//   place.address_components.forEach((component) => {
//     const types = component.types;
//     const value = component.long_name;

//     if (types.includes("locality")) {
//       address.city = value;
//     }

//     if (types.includes("administrative_area_level_2")) {
//       address.state = value;
//     }

//     if (types.includes("postal_code")) {
//       address.zip = value;
//     }

//     if (types.includes("country")) {
//       address.country = value;
//     }
//   });

//   return address;
// };

// function AddAdress() {
//   const searchInput = useRef(null);
//   const [address, setAddress] = useState({});

//   // init gmap script
//   const initMapScript = () => {
//     // if script already loaded
//     if (window.google) {
//       return Promise.resolve();
//     }
//     const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//     return loadAsyncScript(src);
//   };

//   // do something on address change
//   const onChangeAddress = (autocomplete) => {
//     const place = autocomplete.getPlace();
//     setAddress(extractAddress(place));
//   };

//   // init autocomplete
//   const initAutocomplete = () => {
//     if (!searchInput.current) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(
//       searchInput.current
//     );
//     autocomplete.setFields(["address_component", "geometry"]);
//     autocomplete.addListener("place_changed", () =>
//       onChangeAddress(autocomplete)
//     );
//   };

//   const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
//     const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
//     searchInput.current.value = "Getting your location...";
//     fetch(url)
//       .then((response) => response.json())
//       .then((location) => {
//         const place = location.results[0];
//         const _address = extractAddress(place);
//         setAddress(_address);
//         searchInput.current.value = _address.plain();
//       });
//   };

//   const findMyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         reverseGeocode(position.coords);
//       });
//     }
//   };

//   // load map script after mounted
//   useEffect(() => {
//     initMapScript().then(() => initAutocomplete());
//   }, []);

//   return (
//     <div>
//       <span>{/* <Search /> */}</span>

//       <div className="inputContact">
//         <InputGroup>
//           <InputLeftElement
//             pointerEvents="none"
//             children={<HiSearch color="gray.300" />}
//           />
//           <Input type="tel" placeholder="Phone number" />

//           <InputRightElement children={<MdGpsFixed color='green.500' />} />

//         </InputGroup>

//         <InputGroup>
//           <InputLeftElement
//             pointerEvents="none"
//             color="gray.300"
//             fontSize="1.2em"
//             children="$"
//           />
//         </InputGroup>
//       </div>

//       <button onClick={findMyLocation}>{/* <GpsFixed /> */}</button>

//       <div className="address">
//         <p>
//           City: <span>{address.city}</span>
//         </p>
//         <p>
//           State: <span>{address.state}</span>
//         </p>
//         <p>
//           Zip: <span>{address.zip}</span>
//         </p>
//         <p>
//           Country: <span>{address.country}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default AddAdress;
import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  InputRightElement,
  Stack,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { BsEnvelope, BsSearch } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { MdGpsFixed } from "react-icons/md";
import {
  saveAddressshipping,
  savepaymentmethod,
} from "../../../../app/redux/actions/CartAction";
import { useDispatch } from "react-redux";
import { isAuth } from "../../../../_helper/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const {
  ModalOverlay,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
} = require("@chakra-ui/react");

const apiKey = "AIzaSyDJqKQDJ5WtannWAwYWUbSPmNi5MDbaX48";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  var x = place.geometry.location.lat();
  var y = place.geometry.location.lng();

  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    lat: 0,
    lng: 0,
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  address.lat = x;
  address.lng = y;

  return address;
};

function AddAdress() {
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const [description, setDescription] = useState("");
  const [Payment, setPayment] = useState("Card");
  const history = useHistory();

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));

    //SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSss
    setShow(true);
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;

    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        searchInput.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });

      setShow(true);
    }
  };

  const setAdrInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "") {
      setShow(false);
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  //HANDLE ORDER
  // const handleorder = (e) => {
  //   e.preventDefault();

  //   const city = address.city;
  //   const zip = address.zip;
  //   const state = address.state;
  //   const country = address.country;
  //   const data = {
  //     city: city,
  //     zip: zip,
  //     state: state,
  //     country: country,
  //   };
  //   dispatch(saveAddressshipping(data));

  //   dispatch(savepaymentmethod(Payment));
  //   history.push("/shipping/placeorder");
  // };

  const saveAddress = () => {
    console.log(address);
    localStorage.setItem("pharmacyAddress", JSON.stringify(address));
  };
  const createAddress = () => {
    console.log(address);
    dispatch(saveAddressshipping(address));

    dispatch(savepaymentmethod(Payment));
    // localStorage.setItem("shippingAddress", JSON.stringify(address));
  };

  //ADD PHARMACY ADDRESS :
  const addPharmacyAddress = () => {
    const city = address.city;
    const zip = address.zip;
    const state = address.state;
    const country = address.country;
    const lat = address.lat;
    const lng = address.lng;
    const buildingNumber = 1;
    const data = {
      address: {
        city: city,
        zip: zip,
        state: state,
        country: country,
        buildingNumber: buildingNumber,
        lat: lat,
        lng: lng,
      },
    };

    axios
      .post(`http://localhost:5000/api/v1/user/address/create`, data, {
        headers: { Authorization: `${Cookies.get("token")}` },
      })
      .then((res) => {
        alert(JSON.stringify(res));
      });
  };

  return (
    <>
      <div className="flex items-center justify-content">
        <span>{/* <Search /> */}</span>
        <Stack spacing={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<HiSearch color="gray.300" />}
            />
            <Input
              ref={searchInput}
              onChange={(event) => setAdrInput(event)}
              htmlSize={90}
              width="auto"
              type="text"
              className="border-0 px-3 py-3 w-8 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus"
              placeholder="Search Loaction..."
            />
            <button onClick={findMyLocation}>
              {/* <GpsFixed /> */}
              <InputRightElement children={<MdGpsFixed color="green.500" />} />
            </button>
          </InputGroup>
        </Stack>
      </div>

      <>
        <br />
        {show && isAuth() ? (
          <Button
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
          >
            Get Your Informations
          </Button>
        ) : (
          <></>
        )}
        {show && !isAuth() ? (
          <Button
            onClick={() => {
              saveAddress();
            }}
          >
            save your address
          </Button>
        ) : (
          <></>
        )}
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}{" "}
          <ModalContent>
            <ModalHeader>Your Detail Location</ModalHeader>
            {/* <form onSubmit={(e) => handleorder(e)}> */}
            <form>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>CITY</FormLabel>
                  <Input
                    disabled
                    value={address.city}
                    color="white"
                    bg="black"
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>ZIP</FormLabel>
                  <Input
                    disabled
                    value={address.zip}
                    color="white"
                    bg="black"
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>STATE</FormLabel>
                  <Input
                    disabled
                    value={address.state}
                    color="white"
                    bg="black"
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>COUNTRY</FormLabel>
                  <Input
                    disabled
                    value={address.country}
                    color="white"
                    bg="black"
                  />
                </FormControl>{" "}
                {isAuth().role === "PATIENT" && (
                  <FormControl mt={2}>
                    <FormLabel>Note for pharmacists(optional) :</FormLabel>
                    <Textarea
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Leave Comment here :"
                      name="description"
                    />
                  </FormControl>
                )}
              </ModalBody>

              <ModalFooter>
                {isAuth().role === "PHARMACY" ? (
                  <Button
                    onClick={addPharmacyAddress}
                    colorScheme="blue"
                    mr={3}
                  >
                    Save
                  </Button>
                ) : (
                  <Button onClick={createAddress} colorScheme="blue" mr={3}>
                    Save Your address
                  </Button>
                )}
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}

export default AddAdress;
