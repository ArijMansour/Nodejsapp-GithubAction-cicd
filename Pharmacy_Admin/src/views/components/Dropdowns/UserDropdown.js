// import React from "react";
// import { Link } from "react-router-dom";
// import { createPopper } from "@popperjs/core";
// import adminPicture from "../../assets/images/user-admin.png";

// const UserDropdown = () => {
//   // dropdown props
//   const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
//   const btnDropdownRef = React.createRef();
//   const popoverDropdownRef = React.createRef();
//   const openDropdownPopover = () => {
//     createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
//       placement: "bottom-start",
//     });
//     setDropdownPopoverShow(true);
//   };
//   const closeDropdownPopover = () => {
//     setDropdownPopoverShow(false);
//   };
//   return (
//     <>
//       <button
//         className="text-blueGray-500 block"
//         ref={btnDropdownRef}
//         onClick={(e) => {
//           e.preventDefault();
//           dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
//         }}
//       >
//         <div className="items-center flex">
//           <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
//             <img
//               alt="..."
//               className="w-full rounded-full align-middle border-none shadow-lg"
//               src={adminPicture}
//             />
//           </span>
//         </div>
//       </button>
//       <div
//         ref={popoverDropdownRef}
//         className={
//           (dropdownPopoverShow ? "block " : "hidden ") +
//           "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
//         }
//       >
//         <a
//           href="#pablo"
//           className={
//             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//           }
//           onClick={(e) => e.preventDefault()}
//         >
//           <span
//             to="/admin/settings"
//             className={
//               "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//             }
//           >
//             Account Settings
//           </span>
//         </a>

//         <div className="h-0 my-2 border border-solid border-blueGray-100" />
//         <a
//           href="#pablo"
//           className={
//             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//           }
//           onClick={(e) => e.preventDefault()}
//         >
//           <span
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/";
//             }}
//             to="/"
//             className={
//               "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//             }
//           >
//             Logout
//           </span>
//         </a>
//       </div>
//     </>
//   );
// };

// export default UserDropdown;

import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import adminPicture from "../../assets/images/user-admin.png";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <button
        className="text-blueGray-500 block"
        Ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={adminPicture}
            />
          </span>
        </div>
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          <Link
            to="/admin/settings"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            Account Settings
          </Link>
        </a>

        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          <Link
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            to="/"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            Logout
          </Link>
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
