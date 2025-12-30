// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { motion } from "framer-motion";
// // import {
// //    faGaugeHigh,
// //   faBook,
// //   faUsers,
// //   faRightLeft
// // } from "@fortawesome/free-solid-svg-icons";

// // const Sidebar = ({ logout }) => {
// //   const menuItems = [
// //     { label: "Dashboard", path: "/dashboard/home", icon: faGaugeHigh },
// //     { label: "Manage Books", path: "/dashboard/books", icon: faBook },
// //     { label: "Manage Members", path: "/dashboard/members", icon: faUsers },
// //     { label: "Issue / Return", path: "/dashboard/issue", icon: faRightLeft },
// //   ];

// //   return (
// //   <div className="w-64 bg-white shadow-lg flex-shrink-0 p-6 h-screen sticky top-0 flex flex-col justify-between bg-gradient-to-r from-black-500 to-purple-300 text-white ">
// //   <div>
// //     <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>

// //     <nav className="flex flex-col gap-3">
// //       {menuItems.map((item) => (
// //         <NavLink key={item.path} to={item.path}>
// //           {({ isActive }) => (
// //             <motion.div
// //               whileHover={{ scale: 1.03 }}
// //               className={`px-4 py-3 rounded-xl font-medium cursor-pointer ${
// //                 isActive
// //                   ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
// //                   : "hover:bg-gray-100 text-gray-700"
// //               }`}
// //             >
// //               <div className="flex items-center gap-3">
// //                 <FontAwesomeIcon icon={item.icon} />
// //                 <span>{item.label}</span>
// //               </div>
// //             </motion.div>
// //           )}
// //         </NavLink>
// //       ))}
// //     </nav>
// //   </div>

// //   <motion.button
// //     onClick={logout}
// //     whileHover={{ scale: 1.03 }}
// //     className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
// //   >
// //     Logout
// //   </motion.button>
// // </div>


// //   );
// // };

// // export default Sidebar;


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { motion } from "framer-motion";
// import {
//   faGaugeHigh,
//   faBook,
//   faUsers,
//   faRightLeft,
//   faBars,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";

// const Sidebar = ({ logout }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { label: "Dashboard", path: "/dashboard/home", icon: faGaugeHigh },
//     { label: "Manage Books", path: "/dashboard/books", icon: faBook },
//     { label: "Manage Members", path: "/dashboard/members", icon: faUsers },
//     { label: "Issue / Return", path: "/dashboard/issue", icon: faRightLeft },
//   ];

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1024); // <1024px -> tablet/mobile
//       if (window.innerWidth >= 1024) setIsOpen(false); // desktop
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* Hamburger Button for Tablet/Mobile */}
//       {isMobile && (
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white shadow-md"
//         >
//           <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
//         </button>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           w-64 h-screen flex-shrink-0 p-6 flex flex-col justify-between
//           bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow-lg
//           ${isMobile ? "fixed top-0 left-0 z-50 transform transition-transform duration-300" : "sticky top-0"}
//           ${isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : ""}
//         `}
//       >
//         <div>
//           <h2 className="text-2xl font-bold mb-6 text-white">Admin Panel</h2>

//           <nav className="flex flex-col gap-3">
//             {menuItems.map((item) => (
//               <NavLink key={item.path} to={item.path} onClick={() => isMobile && setIsOpen(false)}>
//                 {({ isActive }) => (
//                   <motion.div
//                     whileHover={{ scale: 1.03 }}
//                     className={`px-4 py-3 rounded-xl font-medium cursor-pointer ${
//                       isActive
//                         ? "bg-gradient-to-r from-blue-700 to-purple-500 text-white"
//                         : "hover:bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <FontAwesomeIcon icon={item.icon} />
//                       <span>{item.label}</span>
//                     </div>
//                   </motion.div>
//                 )}
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         <motion.button
//           onClick={logout}
//           whileHover={{ scale: 1.03 }}
//           className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
//         >
//           Logout
//         </motion.button>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faGaugeHigh,
  faBook,
  faUsers,
  faRightLeft,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ logout }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard/home", icon: faGaugeHigh },
    { label: "Manage Books", path: "/dashboard/books", icon: faBook },
    { label: "Manage Members", path: "/dashboard/members", icon: faUsers },
    { label: "Issue / Return", path: "/dashboard/issue", icon: faRightLeft },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // tablet/mobile
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger Button (Left Top) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white shadow-md"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 h-screen flex-shrink-0 p-6 flex flex-col justify-between
          bg-gradient-to-r from-black-500 to-purple-300 text-white shadow-lg
          ${isMobile ? "fixed top-0 left-0 z-50 transform transition-transform duration-300" : "sticky top-0"}
          ${isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : ""}
        `}
      >
        <div>
          {/* Back Arrow (Mobile/Tablet) */}
          {isMobile && isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="mb-4 px-2 py-1 rounded-md bg-blue-500 text-white flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          )}

          <h2 className="text-2xl font-bold mb-6 text-white">Admin Panel</h2>

          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} onClick={() => isMobile && setIsOpen(false)}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`px-4 py-3 rounded-xl font-medium cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={item.icon} />
                      <span>{item.label}</span>
                    </div>
                  </motion.div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.03 }}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
        >
          Logout
        </motion.button>
      </div>
    </>
  );
};

export default Sidebar;

