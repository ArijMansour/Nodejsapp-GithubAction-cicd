import React from "react";
import { Link } from "react-router-dom";
import { ContactImageAnimated } from "../../../util/animations/ContactImageAnimated";
import Footer from "../patient/footers/Footer";
function Contact() {
  return (
    <>
      <section className="mt-10 md:mt-10 pb-20 relative bg-white">
        <div claclassNamess="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:7/12 lg:w-6/12 mt-10">
              <h1 className="text-4xl  text-gray-900 font-bold md:text-4xl text-center">
                Take Care Good Of Yourself
              </h1>

              <div className="container mx-auto p-8">
                <div className="flex flex-wrap">
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col  break-word  bg-white w-full minw mb-8 shadow-lg rounded-lg ">
                      <div className="px-4 py-4 flex-auto">
                        <div
                          className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full
               
               
               bg-gradient-to-r  from-blue-500 to-purple-500"
                        >
                          <i className="fas fa-hospital"></i>
                        </div>
                        <h6 className="text-[16px] font-normal">
                          Interested in a partnership?
                        </h6>
                        {/*               
               <button className="
             focus:ring-blue-700 text-sm font-semibold leading-none
             text-white focus:outline-none bg-gradient-to-r mt-8 from-cyan-500 to-blue-500 border rounded hover:purple-pink-500 hover:to-purple-700 py-4 w-full 
             ease-linear transition-all duration-150" type="button">Read More</button>
               </div>
               
             </div> */}
                        <Link to={"contact/partnership"}>
                          <button
                            className="px-6 py-3 mt-8 overflow-hidden group  rounded-full
              bg-blue-500 relative hover:bg-gradient-to-r 
              hover:from-blue-500 hover:to-purple-500 text-white hover:ring-2 focus:outline-none hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
                          >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative"></span>Contact Us{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-word bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-4 flex-auto">
                        <div
                          className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full
               bg-gradient-to-r  from-blue-500 to-purple-500"
                        >
                          <i className="fas fa-user"></i>
                        </div>
                        <h6 className="text-[16px]  font-normal">
                          Need partner support?
                        </h6>

                        <button
                          className="px-6 py-3 mt-8 overflow-hidden group  rounded-full
              bg-blue-500 relative hover:bg-gradient-to-r 
              hover:from-blue-500 hover:to-purple-500 text-white hover:ring-2 focus:outline-none hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
                        >
                          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                          <span className="relative"></span>Contact Us{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-word bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-4 flex-auto">
                        <div
                          className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full
               bg-gradient-to-r  from-blue-500 to-purple-500"
                        >
                          <i className="fas fa-question"></i>
                        </div>
                        <h6 className="text-[16px]  font-normal">
                          Need help using DrWise?
                        </h6>
                        <button
                          className="px-6 py-3 mt-8 overflow-hidden group  rounded-full
              bg-blue-500 relative hover:bg-gradient-to-r 
              hover:from-blue-500 hover:to-purple-500 text-white hover:ring-2 focus:outline-none hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
                        >
                          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                          <span className="relative"></span>Contact Us{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:5/12 lg:w-5/12 hidden md:block">
              <ContactImageAnimated />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
