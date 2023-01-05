import React from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import { Input } from "antd";
import Footer from "../footers/Footer";
const { TextArea } = Input;
function ContactPartner() {
  const onChange = () => {
    console.log("gii");
  };
  return (
    <>
      <section className="mt-10 md:mt-10 pb-20 relative bg-white">
        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h1 className="font-semibold text-4xl">Get In Touch With Us</h1>
          </div>
        </div>
        <div className="h-full w-full py-16 px-4 ">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-1/2 px-3 md:mb-6 mb-6">
                      <label className="text-sm font-medium leading-none text-gray-800">
                        First Name
                      </label>
                      <Input
                        size="large"
                        name="firstname"
                        type="text"
                        id="firstname"
                        className={`bg-white border-[1px] border-gray-400 rounded focus:outline-none text-xs font-medium leading-none  text-gray-800
             py-3 w-full pl-3 mt-2 `}
                        placeholder="Enter First Name"
                        prefix={<UserOutlined />}
                      />
                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 ">
                      <label className="text-sm font-medium leading-none text-gray-800">
                        Last Name
                      </label>
                      <Input
                        size="small"
                        name="lastname"
                        type="text"
                        id="lastname"
                        className={`bg-white border-[1px] border-gray-400 rounded focus:outline-none  font-medium leading-none  text-gray-800
             py-3 w-full pl-3 mt-2 `}
                        placeholder="Enter Last Name"
                        prefix={<UserOutlined />}
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="mb-8 -mt-6">
                  <div className="flex flex-wrap -mx-3 mb-6 mt-0">
                    <div className="w-full px-3">
                      <label className="text-sm font-medium leading-none text-gray-800">
                        Email
                      </label>
                      <Input
                        size="small"
                        name="email"
                        type="email"
                        id="email"
                        className={`bg-white border-[1px] border-gray-400 rounded 
             focus:outline-none  font-medium leading-none   text-sm
             text-gray-800
             py-3 w-full pl-3 mt-2 `}
                        placeholder="Enter Email"
                        prefix={<MailOutlined />}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="text-sm font-medium leading-none text-gray-800">
                        Message
                      </label>
                      <TextArea
                        className="mt-2            font-medium leading-none    text-gray-800  
 py-3 w-full pl-3  bg-white border-[1px] border-gray-400 rounded "
                        prefix={<MailOutlined />}
                        placeholder="Enter Message"
                        allowClear
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center">
                    <div className="md:w-full">
                      <button
                        className="
 focus:ring-blue-700 text-sm font-semibold leading-none
 text-white focus:outline-none bg-gradient-to-r from-cyan-500 to-blue-500 border rounded hover:purple-pink-500 hover:to-purple-700 py-4 w-full 
 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send
                      </button>
                    </div>
                  </div>

                  <div className="md:w-2/3"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ContactPartner;
