import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  TableContainer,
  Box,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { listPrescriptions } from "../../../../app/redux/actions/PrescriptionAction";
import "../../patient/cart/style-cart.css";
import Slider from "react-slick";

const MyPrescription = ({ location, history }) => {
  const [message, setMessage] = useState(null);
  const imgs = document.querySelectorAll(".img-select a");
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const myprescription = useSelector((state) => state.myprescription);

  const {
    loading: loadingPrescriptions,
    error: errorPrescriptions,
    prescriptions,
  } = myprescription;

  useEffect(() => {
    dispatch(listPrescriptions());
  }, [dispatch, history]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const Line = useRef(null);
  const text = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      Line.current.classList.add("lineon");
      text.current.classList.add("titleon");
    }, 5);

    return () => {};
  }, []);
  return (
    <div>
      <div className="headingA">
        <div className="line" ref={Line}></div>
        <h1 className="title" ref={text}>
          <Link to="/upload-prescription"> Upload Prescription </Link> /History
        </h1>
      </div>{" "}
      <Flex minH={"50vh"} align={"center"} justify={"center"}>
        <div className="tableorder">
          {loadingPrescriptions ? (
            <div className="loading">
              <SyncLoader
                color={"#1e1e2c"}
                loading={loadingPrescriptions}
                size={40}
              />
            </div>
          ) : errorPrescriptions ? (
            <h1>{errorPrescriptions}</h1>
          ) : (
            <Box overflowX="auto">
              {prescriptions.length > 0 ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th textAlign="center" w="10%">
                          ID
                        </Th>
                        <Th textAlign="center" w="20%">
                          DOSAGE
                        </Th>
                        <Th textAlign="center" w="20%">
                          DATE
                        </Th>
                        <Th textAlign="center" w="5%">
                          STATE
                        </Th>
                        <Th textAlign="center" w="10%">
                          DETAILS
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {prescriptions.map((pres) => (
                        <>
                          {" "}
                          <Tr key={pres._id}>
                            <Td>{pres._id}</Td>
                            <Td>{pres.dosage}</Td>

                            <Td>{pres.createdAt.substring(0, 10)}</Td>
                            <Td>
                              {" "}
                              <Badge colorScheme="yellow">{pres.state}</Badge>
                            </Td>

                            <Td>
                              <Stack>
                                <Button
                                  onClick={onOpen}
                                  leftIcon={<AiOutlineEdit size="16" />}
                                  colorScheme="blue"
                                  size="xs"
                                >
                                  Details
                                </Button>
                              </Stack>
                            </Td>
                          </Tr>
                          <Modal
                            blockScrollOnMount={false}
                            isOpen={isOpen}
                            onClose={onClose}
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Detail Prescription</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Text fontWeight="bold" mb="1rem"></Text>
                                <div>
                                  <h2>
                                    {" "}
                                    you have {
                                      pres.multiple_resources.length
                                    }{" "}
                                    pictures
                                  </h2>
                                  <Slider {...settings}>
                                    {pres.multiple_resources.map((i) => (
                                      <>
                                        {" "}
                                        <Image
                                          objectFit="cover"
                                          src={i.url}
                                          alt="prescription"
                                        />
                                      </>
                                    ))}
                                  </Slider>
                                </div>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={onClose}
                                >
                                  Close
                                </Button>
                                {/* <Button variant="ghost">Secondary Action</Button> */}
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <p className="text-3xl text-center  leading-6 text-gray-500 mt-3">
                  You don't have any prescription{" "}
                </p>
              )}
            </Box>
          )}
        </div>
      </Flex>
      <> </>
    </div>
  );
};

export default MyPrescription;
