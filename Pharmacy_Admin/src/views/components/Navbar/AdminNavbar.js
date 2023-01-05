import { Fragment, useRef, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { IoCloseCircle, IoMedal, IoMenu } from "react-icons/io5";
import { AiFillBell } from "react-icons/ai";
import { isAuth } from "../../../_helper/auth";
import NotificationComponent from "../notification/Notification";
import NotificationHeader from "../notification/NotificationHeader";

import {
  Card,
  Image,
  Button,
  Icon,
  Message,
  Label,
  Grid,
  List,
  Divider,
  Dropdown,
  Segment,
  Step,
} from "semantic-ui-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import {
  fetchNotifications,
  fetchNotificationsPharmacy,
  selectNotifications,
  setNotifications,
} from "../../../app/redux/slices/NotificationSlice";
import { Link } from "react-router-dom";
import { apiNotification } from "../../../app/redux/actions/notificationAction";
import axios from "axios";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdminNavbar() {
  const socket = useRef();
  const dispatch = useDispatch();

  const [nbrNotif, setNbrNotif] = useState(false);
  const [numberNotif, setNumberNotif] = useState(0);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    dispatch(fetchNotificationsPharmacy(isAuth().id));
  }, [dispatch]);
  const state = useSelector((state) => state.UserReducer.userUpdated);

  const [notifications, errr] = useSelector(selectNotifications);
  const user = useSelector((state) => state.auth);

  useEffect(() => {}, [state]);

  const [activeItem, SetActiveItem] = useState("Dashboard");
  const handleItemClick = (e, { name }) => {
    if (name === "Logout") {
      signout(() => {
        toast.error("Signout Successfully");
      });
      SetActiveItem(name);
    } else {
      SetActiveItem(name);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/notification/get/${isAuth().id}`)
      .then((res) => {
        if (res.data.status !== false) {
          setNotifs(res.data);
          setNbrNotif(true);
          setNumberNotif(res.data.length);
        } else {
          setNbrNotif(false);
          setNotifs(res.data);
        }
      });
  }, [isAuth(), numberNotif]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    socket.current.on("newNotification", (content) => {
      axios
        .get(`http://localhost:5000/api/v1/notification/get/${isAuth().id}`)
        .then((res) => {
          if (res.data.status !== false) {
            setNotifs(res.data);
            setNbrNotif(true);
            setNumberNotif(res.data.length);
          } else {
            setNbrNotif(false);
            setNotifs(res.data);
          }
        });
    });
  }, []);

  useEffect(() => {}, []);
  return (
    <Disclosure as="nav" className=" bg-[#F3F4F6]">
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
                    {nbrNotif && <span class="badgeN">{numberNotif}</span>}
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
                          // <a
                          //   href="#"
                          //   className={classNames(
                          //     active ? "bg-gray-100" : "",
                          //     "block px-4 py-2 text-sm text-gray-700"
                          //   )}
                          // >
                          <>
                            {notifs.map((notif, index) => (
                              <div>
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {notif.Prescription !== null && (
                                    <>
                                      <List divided>
                                        <List.Item>
                                          <List.Content>
                                            {notif.status === false ? (
                                              <List.Header
                                                as="p"
                                                style={{ color: "blue" }}
                                              >
                                                <strong>
                                                  {notif.Owner[0].username.toUpperCase()}
                                                  {""}
                                                  {""}
                                                </strong>

                                                <span
                                                  style={{
                                                    color: "gray",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  send you prescription{" "}
                                                  <List.Icon
                                                    name="circle"
                                                    color="green"
                                                    size="large"
                                                    verticalAlign="middle"
                                                  />
                                                </span>
                                              </List.Header>
                                            ) : (
                                              <List.Header as="p">
                                                <strong>
                                                  {notif.Owner[0].username.toUpperCase()}
                                                  {""}
                                                  {""}
                                                </strong>

                                                <span
                                                  style={{
                                                    color: "gray",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  send you prescription <br />
                                                  <span
                                                    style={{
                                                      color: "green",
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Readed
                                                  </span>
                                                </span>
                                              </List.Header>
                                            )}
                                            <List.Description>
                                              <p style={{ fontSize: "10px" }}>
                                                {/*<ReactTimeAgo*/}
                                                {/*    date={notif.Date}*/}
                                                {/*/>{" "}*/}
                                                <moment>
                                                  {" "}
                                                  {moment(notif.Date).format(
                                                    "YYYY-MM-DD "
                                                  )}
                                                </moment>
                                              </p>{" "}
                                            </List.Description>
                                          </List.Content>
                                        </List.Item>
                                      </List>
                                      <Divider />
                                    </>
                                  )}
                                  {notif.Order !== null && (
                                    <>
                                      <List divided>
                                        <List.Item>
                                          <List.Content>
                                            {notif.status === false ? (
                                              <List.Header
                                                as="p"
                                                style={{ color: "blue" }}
                                              >
                                                <strong>
                                                  {notif.Owner[0].username.toUpperCase()}
                                                  {""}
                                                  {""}
                                                </strong>

                                                <span
                                                  style={{
                                                    color: "gray",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  send you order{" "}
                                                  <List.Icon
                                                    name="circle"
                                                    color="green"
                                                    size="large"
                                                    verticalAlign="middle"
                                                  />
                                                </span>
                                              </List.Header>
                                            ) : (
                                              <List.Header as="p">
                                                <strong>
                                                  {notif.Owner[0].username.toUpperCase()}
                                                  {""}
                                                  {""}
                                                </strong>

                                                <span
                                                  style={{
                                                    color: "gray",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  send you order <br />
                                                  <span
                                                    style={{
                                                      color: "green",
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Readed
                                                  </span>
                                                </span>
                                              </List.Header>
                                            )}
                                            <List.Description>
                                              <p style={{ fontSize: "10px" }}>
                                                {/*<ReactTimeAgo*/}
                                                {/*    date={notif.Date}*/}
                                                {/*/>{" "}*/}
                                                <moment>
                                                  {" "}
                                                  {moment(notif.Date).format(
                                                    "YYYY-MM-DD "
                                                  )}
                                                </moment>
                                              </p>{" "}
                                            </List.Description>
                                          </List.Content>
                                        </List.Item>
                                      </List>
                                      <Divider />
                                    </>
                                  )}
                                </a>
                                <Dropdown.Divider />
                              </div>
                            ))}
                          </>
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
                        src={isAuth().picture}
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
  );
}

export default AdminNavbar;
