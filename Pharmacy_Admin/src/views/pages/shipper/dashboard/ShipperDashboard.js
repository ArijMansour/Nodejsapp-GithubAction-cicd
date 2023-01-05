import { Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../../../_helper/auth";

function ShipperDashboard() {
  return (
    <div>
      <div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div
          class="bg-indigo-600 text-white rounded shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4"
          x-data="{welcomeMessageShow:true}"
          x-show="welcomeMessageShow"
        >
          <div class="flex flex-wrap -mx-3 items-center">
            <div class="w-1/4 px-3 text-center hidden md:block">
              <div class="p-5 xl:px-8 md:py-5">
                <Image
                  objectFit={"cover"}
                  src={"https://cdn-icons-png.flaticon.com/512/305/305976.png"}
                />
              </div>
            </div>
            <div class="w-full sm:w-1/2 md:w-2/4 px-3 text-left">
              <div class="p-5 xl:px-8 md:py-5">
                <h3 class="text-2xl">
                  Welcome {isAuth().firstName.toUpperCase()} {""}
                  {isAuth().lastName.toUpperCase()}!
                </h3>
                {/* <h5 class="text-xl mb-3">Lorem ipsum sit amet</h5> */}
                <p class="text-sm text-indigo-200">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro sit asperiores perferendis odit enim natus ipsum
                  reprehenderit eos eum impedit tenetur nemo corporis laboriosam
                  veniam dolores quos necessitatibus, quaerat debitis.
                </p>
              </div>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/4 px-3 text-center">
              <div class="p-5 xl:px-8 md:py-5">
                <Link
                  class="block w-full py-2 px-4 rounded text-indigo-600 bg-gray-200 hover:bg-white hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out mb-3"
                
                    to="/shipper/orders"
                >
                  See Patients Orders
                </Link>
                <button class="w-full py-2 px-4 rounded text-white bg-indigo-900 hover:bg-gray-900 focus:outline-none transition duration-150 ease-in-out">
                  Calculate Route
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 pb-2 text-gray-700 text-xs w-full text-center"></div>

        <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <div>
            <a
              title="Buy me a beer"
              href="https://www.buymeacoffee.com/scottwindon"
              target="_blank"
              class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            >
              <img
                class="object-cover object-center w-full h-full rounded-full"
                src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipperDashboard;
