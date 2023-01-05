import React, { useEffect } from "react";
import { Header, Icon, List, Message, Segment } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchNotifications,
  fetchNotificationsPharmacy,
  selectNotifications,
} from "../../../app/redux/slices/NotificationSlice";
import { apiNotification } from "../../../app/redux/actions/notificationAction";
import { isAuth } from "../../../_helper/auth";

function Notification() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotificationsPharmacy(isAuth().id));
  }, [dispatch, selectNotifications]);

  const [notifications, errr] = useSelector(selectNotifications);
  const updatenotification = async (id_notif) => {
    try {
      const res = await apiNotification.putNotification(id_notif);
      dispatch(fetchNotificationsPharmacy(isAuth().id));
    } catch (error) {
      alert(error);
    }
  };
  const deleted = async (id) => {
    try {
      const res = await apiNotification.deleteNotification(id);
      dispatch(fetchNotificationsPharmacy(isAuth().id));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Segment raised color="red">
      <Header />
      {isAuth().role === "PHARMACY" ? (
        <Link to={"/dashboardUser"}>Return Home</Link>
      ) : (
        <Link to={"/admin"}>Return Home</Link>
      )}
      <Header as="h2" icon textAlign="center">
        <Icon name="bell" circular color="yellow" />
        <Header.Content>Notifications</Header.Content>
      </Header>

      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className={"font-semibold text-lg text-blueGray-700"}>
                  All Notifications
                </h3>
                {notifications.map((notif, index) => (
                  <List.Item key={index}>
                    {
                      <div>
                        {notif.status === false ? (
                          <List>
                            <div className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                              {/* <List.Content floated="right">
                              <Icon
                                name="trash"
                                onClick={() => deleted(notif._id)}
                              ></Icon>
                            </List.Content> */}

                              <button
                                onClick={() => deleted(notif._id)}
                                //record is the row data
                              >
                                {" "}
                                {/* Update category */}
                                <i className="fas fa-circle text-white" />
                              </button>
                              <Link
                                to={"/prescriptions"}
                                onClick={() => updatenotification(notif._id)}
                              >
                                {" "}
                                {/*{notif.Prescription[0].description ===*/}
                                {/*"undefined" ? (*/}
                                {/*  <List.Content>*/}
                                {/*    not mentioned a note*/}
                                {/*  </List.Content>*/}
                                {/*) : (*/}
                                {/*  <List.Content>*/}
                                {/*    {notif.Prescription[0].description}*/}
                                {/*  </List.Content>*/}
                                {/*)}*/}
                                <List.Description>
                                  <p style={{ fontSize: "13px" }}>
                                    {notif.Date}
                                  </p>{" "}
                                </List.Description>
                              </Link>
                            </div>

                            <div className="relative flex float-right  min-w-0 break-words    rounded ">
                              <button
                                onClick={() => deleted(notif._id)}
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                //record is the row data
                              >
                                {" "}
                                {/* Update category */}
                                <i className="fas fa-trash text-white" />
                              </button>
                            </div>
                          </List>
                        ) : (
                          <>
                            <div className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                              {/* <List.Content floated="right">
                              <Icon
                                name="trash"
                                onClick={() => deleted(notif._id)}
                              ></Icon>
                            </List.Content> */}

                              <button
                                onClick={() => deleted(notif._id)}
                                //record is the row data
                              >
                                {" "}
                                {/* Update category */}
                                <i className="fas fa-circle text-white" />
                                <Link
                                  to={"/prescriptions"}
                                  onClick={() => updatenotification(notif._id)}
                                >
                                  {" "}
                                  {/* {notif.Prescription[0].description ===
                                  "undefined" ? (
                                    <List.Content>
                                      not mentioned a note
                                    </List.Content>
                                  ) : (
                                    <List.Content>
                                      {notif.Prescription[0].description}
                                    </List.Content>
                                  )} */}
                                  <List.Description>
                                    <p style={{ fontSize: "13px" }}>
                                      {notif.Date}
                                    </p>{" "}
                                  </List.Description>
                                </Link>
                              </button>
                            </div>

                            <div className="relative flex float-right  min-w-0 break-words    rounded ">
                              <button
                                onClick={() => deleted(notif._id)}
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                //record is the row data
                              >
                                {" "}
                                {/* Update category */}
                                <i className="fas fa-trash text-white" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      // notif.Note !== null ?
                      //     <div>
                      //         {notif.status === false ? (
                      //             <Message style={{backgroundColor: "#ADD8E6"}}>
                      //                 <List.Content floated="right">
                      //                     <Icon
                      //                         name="trash"
                      //                         onClick={() => deleted(notif._id)}
                      //                     ></Icon>
                      //                 </List.Content>
                      //                 <Icon name="pao circle outline" size="large"/>
                      //                 <Link
                      //                     to={"/myMark/" + notif.Note}
                      //                     onClick={() => updatenotification(notif._id)}
                      //                 >
                      //                     {" "}
                      //                     <List.Content>{notif.Message}</List.Content>
                      //                     <List.Description>
                      //                         <p style={{fontSize: "13px"}}>
                      //                             {notif.Date}
                      //                         </p>{" "}
                      //                     </List.Description>
                      //                 </Link>
                      //             </Message>
                      //         ) : (
                      //             <Message>
                      //                 <List.Content floated="right">
                      //                     <Icon
                      //                         name="trash"
                      //                         onClick={() => deleted(notif._id)}
                      //                     ></Icon>
                      //                 </List.Content>
                      //                 <Icon name="question circle outline" size="large"/>
                      //                 <Link
                      //                     to={"/FAQ/" + notif.Question}
                      //                     onClick={() => updatenotification(notif._id)}
                      //                 >
                      //                     {" "}
                      //                     <List.Content>{notif.Message}</List.Content>
                      //                     <List.Description>
                      //                         <p style={{fontSize: "13px"}}>
                      //                             {notif.Date}
                      //                         </p>{" "}
                      //                     </List.Description>
                      //                 </Link>
                      //             </Message>
                      //         )}
                      //     </div>

                      //     :
                      //     notif.Claim !== null &&
                      //     <div>
                      //         {notif.status === false ? (
                      //             <Message style={{backgroundColor: "#ADD8E6"}}>
                      //                 <List.Content floated="right">
                      //                     <Icon
                      //                         name="trash"
                      //                         onClick={() => deleted(notif._id)}
                      //                     ></Icon>
                      //                 </List.Content>
                      //                 <Icon name="pao circle outline" size="large"/>
                      //                 <Link
                      //                     to={"/listClaims/"}
                      //                     onClick={() => updatenotification(notif._id)}
                      //                 >
                      //                     {" "}
                      //                     <List.Content>{notif.Message}</List.Content>
                      //                     <List.Description>
                      //                         <p style={{fontSize: "13px"}}>
                      //                             {notif.Date}
                      //                         </p>{" "}
                      //                     </List.Description>
                      //                 </Link>
                      //             </Message>
                      //         ) : (
                      //             <Message>
                      //                 <List.Content floated="right">
                      //                     <Icon
                      //                         name="trash"
                      //                         onClick={() => deleted(notif._id)}
                      //                     ></Icon>
                      //                 </List.Content>
                      //                 <Icon name="question circle outline" size="large"/>
                      //                 {/*<Link*/}
                      //                 {/*    to={"/listClaim/"}*/}
                      //                 {/*    onClick={() => updatenotification(notif._id)}*/}
                      //                 {/*>*/}
                      //                 {/*    {" "}*/}
                      //                     <List.Content>{notif.Message}</List.Content>
                      //                     <List.Description>
                      //                         <p style={{fontSize: "13px"}}>
                      //                             {notif.Date}
                      //                         </p>{" "}
                      //                     </List.Description>
                      //                 {/*</Link>*/}
                      //             </Message>
                      //         )}
                      //     </div>
                    }
                  </List.Item>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Segment>
  );
}

export default Notification;
