import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { IoCloseCircle, IoMedal, IoMenu } from "react-icons/io5";
import { AiFillBell } from "react-icons/ai";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const center = { lat: 48.8584, lng: 2.2945 };

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CalculateRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKXNneTVr8yaKCVD_sCEFj9CNCtcU85V8",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    alert(JSON.stringify(results.routes[0]));
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <>
      <Disclosure as="nav" className=" p-4 bg-[#F3F4F6]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <IoCloseCircle
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <IoMenu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <img
                      className="block h-8 w-auto lg:hidden"
                      src="../../../img/dwaya.png"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="../../../img/dwaya.png"
                      alt="Your Company"
                    /> */}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {" "}
                  {/* <NotificationHeader /> */}
                  <Menu as="div" className="relative ml-3 flex-col">
                    {" "}
                    <div>
                      {" "}
                      <div className=""></div>
                      {true && <span class="badgeN">{5}</span>}
                      <Menu.Button className="rounded-full  p-1 text-gray-400  focus:outline-none ">
                        <AiFillBell className="h-8 w-8 " />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute  right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <></>
                            // <a
                            //   href="#"
                            //   className={classNames(
                            //     active ? "bg-gray-100" : "",
                            //     "block px-4 py-2 text-sm text-gray-700"
                            //   )}
                            // >
                            // <>
                            //   {notifs.map((notif, index) => (
                            //     <div>
                            //       <a
                            //         href="#"
                            //         className={classNames(
                            //           active ? "bg-gray-100" : "",
                            //           "block px-4 py-2 text-sm text-gray-700"
                            //         )}
                            //       >
                            //         {notif.Prescription !== null && (
                            //           <>
                            //             <List divided>
                            //               <List.Item>
                            //                 <List.Content>
                            //                   {notif.status === false ? (
                            //                     <List.Header
                            //                       as="p"
                            //                       style={{ color: "blue" }}
                            //                     >
                            //                       <strong>
                            //                         {notif.Owner[0].username.toUpperCase()}
                            //                         {""}
                            //                         {""}
                            //                       </strong>

                            //                       <span
                            //                         style={{
                            //                           color: "gray",
                            //                           marginLeft: "5px",
                            //                         }}
                            //                       >
                            //                         send you prescription{" "}
                            //                         <List.Icon
                            //                           name="circle"
                            //                           color="green"
                            //                           size="large"
                            //                           verticalAlign="middle"
                            //                         />
                            //                       </span>
                            //                     </List.Header>
                            //                   ) : (
                            //                     <List.Header as="p">
                            //                       <strong>
                            //                         {notif.Owner[0].username.toUpperCase()}
                            //                         {""}
                            //                         {""}
                            //                       </strong>

                            //                       <span
                            //                         style={{
                            //                           color: "gray",
                            //                           marginLeft: "5px",
                            //                         }}
                            //                       >
                            //                         send you prescription <br />
                            //                         <span
                            //                           style={{
                            //                             color: "green",
                            //                             fontWeight: "700",
                            //                           }}
                            //                         >
                            //                           Readed
                            //                         </span>
                            //                       </span>
                            //                     </List.Header>
                            //                   )}
                            //                   <List.Description>
                            //                     <p style={{ fontSize: "10px" }}>
                            //                       {/*<ReactTimeAgo*/}
                            //                       {/*    date={notif.Date}*/}
                            //                       {/*/>{" "}*/}
                            //                       <moment>
                            //                         {" "}
                            //                         {moment(notif.Date).format(
                            //                           "YYYY-MM-DD "
                            //                         )}
                            //                       </moment>
                            //                     </p>{" "}
                            //                   </List.Description>
                            //                 </List.Content>
                            //               </List.Item>
                            //             </List>
                            //             <Divider />
                            //           </>
                            //         )}
                            //         {notif.Order !== null && (
                            //           <>
                            //             <List divided>
                            //               <List.Item>
                            //                 <List.Content>
                            //                   {notif.status === false ? (
                            //                     <List.Header
                            //                       as="p"
                            //                       style={{ color: "blue" }}
                            //                     >
                            //                       <strong>
                            //                         {notif.Owner[0].username.toUpperCase()}
                            //                         {""}
                            //                         {""}
                            //                       </strong>

                            //                       <span
                            //                         style={{
                            //                           color: "gray",
                            //                           marginLeft: "5px",
                            //                         }}
                            //                       >
                            //                         send you order{" "}
                            //                         <List.Icon
                            //                           name="circle"
                            //                           color="green"
                            //                           size="large"
                            //                           verticalAlign="middle"
                            //                         />
                            //                       </span>
                            //                     </List.Header>
                            //                   ) : (
                            //                     <List.Header as="p">
                            //                       <strong>
                            //                         {notif.Owner[0].username.toUpperCase()}
                            //                         {""}
                            //                         {""}
                            //                       </strong>

                            //                       <span
                            //                         style={{
                            //                           color: "gray",
                            //                           marginLeft: "5px",
                            //                         }}
                            //                       >
                            //                         send you order <br />
                            //                         <span
                            //                           style={{
                            //                             color: "green",
                            //                             fontWeight: "700",
                            //                           }}
                            //                         >
                            //                           Readed
                            //                         </span>
                            //                       </span>
                            //                     </List.Header>
                            //                   )}
                            //                   <List.Description>
                            //                     <p style={{ fontSize: "10px" }}>
                            //                       {/*<ReactTimeAgo*/}
                            //                       {/*    date={notif.Date}*/}
                            //                       {/*/>{" "}*/}
                            //                       <moment>
                            //                         {" "}
                            //                         {moment(notif.Date).format(
                            //                           "YYYY-MM-DD "
                            //                         )}
                            //                       </moment>
                            //                     </p>{" "}
                            //                   </List.Description>
                            //                 </List.Content>
                            //               </List.Item>
                            //             </List>
                            //             <Divider />
                            //           </>
                            //         )}
                            //       </a>
                            //       <Dropdown.Divider />
                            //     </div>
                            //   ))}
                            // </>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/notifications"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              View All Notifications
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            "https://cdn-icons-png.flaticon.com/512/305/305976.png"
                          }
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              {" "}
              <div className="space-y-1 px-2 pt-2 pb-3">
                {" "}
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="w-full ">
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
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Box>
          <Box
            p={4}
            borderRadius="lg"
            m={4}
            bgColor="white"
            shadow="base"
            minW="container.md"
            zIndex="1"
          >
            <HStack spacing={2} justifyContent="space-between">
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input type="text" placeholder="Origin" ref={originRef} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    type="text"
                    placeholder="Destination"
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>

              <ButtonGroup>
                <Button
                  colorScheme="pink"
                  type="submit"
                  onClick={calculateRoute}
                >
                  Calculate Route
                </Button>
                <IconButton
                  aria-label="center back"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </ButtonGroup>
            </HStack>
            <HStack spacing={4} mt={4} justifyContent="space-between">
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
            </HStack>
          </Box>
        </Flex>
      </div>
    </>
  );
}

export default CalculateRoute;
