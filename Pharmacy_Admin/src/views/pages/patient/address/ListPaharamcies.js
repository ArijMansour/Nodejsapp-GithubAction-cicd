// // import React, { useEffect, useState } from "react";

// // import ReactCardSlider from "react-card-slider-component";
// // // a slide object contains the image link, title and function/click event for when a user clicks on a card
// // import UserService from "../../../../infrastructure/services/api/UserService";
// // function ListPaharamcies() {
// //   const [pharmacies, setPharmacies] = useState([]);

// //   //LOAD DATA
// //   const loadPharmacies = () =>
// //     UserService.GetPharmacies().then((c) => {
// //       // alert(JSON.stringify(c));

// //       if (c.data.length > 0) {
// //         setPharmacies(c.data);
// //       }
// //     });
// //   useEffect(() => {
// //     loadPharmacies();
// //   }, []);

// //   const sliderClick = () => {
// //     alert("click");
// //   };

// //   const slides = [
// //     {
// //       image: "https://picsum.photos/200/300",
// //       title: "This is a title",
// //       description: "This is a description",
// //       clickEvent: sliderClick,
// //     },
// //     {
// //       image: "https://picsum.photos/600/500",
// //       title: "This is a second title",
// //       description: "This is a second description",
// //       clickEvent: sliderClick,
// //     },
// //     {
// //       image: "https://picsum.photos/700/600",
// //       title: "This is a third title",
// //       description: "This is a third description",
// //       clickEvent: sliderClick,
// //     },
// //     {
// //       image: "https://picsum.photos/500/400",
// //       title: "This is a fourth title",
// //       description: "This is a fourth description",
// //       clickEvent: sliderClick,
// //     },
// //     {
// //       image: "https://picsum.photos/200/300",
// //       title: "This is a fifth title",
// //       description: "This is a fifth description",
// //       clickEvent: sliderClick,
// //     },
// //     {
// //       image: "https://picsum.photos/800/700",
// //       title: "This is a sixth title",
// //       description: "This is a sixth description",
// //       clickEvent: sliderClick,
// //     },
// //     {
// //       image: "https://picsum.photos/300/400",
// //       title: "This is a seventh title",
// //       description: "This is a seventh description",
// //       clickEvent: sliderClick,
// //     },
// //   ];

// //   return (
// //     <div>
// //       {pharmacies.map((item, index) => {
// //         return <ReactCardSlider slides={item} key={index} />;
// //       })}
// //     </div>
// //   );
// // }

// // export default ListPaharamcies;

// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import SyncLoader from "react-spinners/SyncLoader";

// import UserService from "../../../../infrastructure/services/api/UserService";
// import defaultImg from "../../../assets/images/default-image.jpg";
// import CardPharmacy from "../../../components/patient/pharmacies/CardPharmacy";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Marker } from "@react-google-maps/api";
// function ListPaharamcies() {
//   const [defaultImage, setDefaultImage] = useState({});
//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const [pharmacies, setPharmacies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [address, setAddress] = useState({});

//   //LOAD DATA

//   const loadPharmaciesAdr = () => {
//     axios
//       .get(`http://localhost:5000/api/v1/user/address/getpharmacyadd`)
//       .then((res) => {
//         const data = JSON.parse(JSON.stringify(res.data));

//         setAddress(data.data);
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     loadPharmaciesAdr();
//   }, []);

//   const sliderClick = () => {
//     alert("click");
//   };

//   const handleErrorImage = (data) => {
//     setDefaultImage((prev) => ({
//       ...prev,
//       [data.target.alt]: data.target.alt,
//       linkDefault: defaultImg,
//     }));
//   };

//   const Line = useRef(null);
//   const text = useRef(null);
//   useEffect(() => {
//     setTimeout(() => {
//       Line.current.classList.add("lineon");
//       text.current.classList.add("titleon");
//     }, 5);

//     return () => {};
//   }, []);
//   return (
//     <>
//       <div className="headingA">
//         <div className="line" ref={Line}></div>
//         <h1 className="title" ref={text}>
//           Available Pharmacies
//         </h1>
//       </div>

//       <div className="flex-col">
//         {loading ? (
//           <div className="loading">
//             <SyncLoader color={"#fff"} loading={loading} size={40} />
//           </div>
//         ) : address.length === 0 ? (
//           <h1 className="nothingfound">Nothing Found !!!</h1>
//         ) : (
//           <div className="cardsProduct">
//             {address.map((data, index) => {
//               return (
//                 <CardPharmacy key={data.id} pharmacy={data} index={index} />
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default ListPaharamcies;

import React, { useState, useEffect, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";

const center = { lat: 36.806389, lng: 10.181667 };
const ListPaharamcies = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKXNneTVr8yaKCVD_sCEFj9CNCtcU85V8",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({});

  //LOAD DATA

  const loadPharmaciesAdr = () => {
    axios
      .get(`http://localhost:5000/api/v1/user/address/getpharmacyadd`)
      .then((res) => {
        const data = JSON.parse(JSON.stringify(res.data));

        setAddress(data.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    loadPharmaciesAdr();
  }, []);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <section>
      <div className="w-60 mt-40">
        <Flex
          position="relative"
          flexDirection="column"
          alignItems="center"
          h="100vh"
          w="100vw"
        >
          <Box position="absolute" left={0} top={0} h="100%" w="100%">
            {/* Google Map Box */}
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {address.map((location, i) => {
                return (
                  <>
                    {console.log(location.address[0].lat)}
                    {console.log(location.address[0].lng)}
                    <Marker
                      position={{
                        lat: location.address[0].lat,
                        lng: location.address[0].lng,
                      }}
                    />
                  </>
                );
              })}
              {/* 
{this.state.locations.map((location, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: location.lat(), lng: location.lng() }}
              />
            );
}} */}
              {/* <Marker position={center} /> */}
              {/* {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )} */}
            </GoogleMap>
          </Box>
          <Box
          // p={4}
          // borderRadius="lg"
          // m={4}
          // bgColor="white"
          // shadow="base"
          // minW="container.md"
          // zIndex="1"
          >
            {/* <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              {/* <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete> */}
            {/* </Box> */}
            {/* <Box flexGrow={1}> */}
            {/* <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete> */}
            {/* </Box> */}

            {/* <ButtonGroup> */}
            {/* <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button> */}
            {/* <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup> */}
            {/* <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            />
          </HStack> */}
          </Box>
        </Flex>
      </div>
    </section>
  );
};

export default ListPaharamcies;
