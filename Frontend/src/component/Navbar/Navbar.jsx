// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

// export default function Navbar() {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [sofas, setSofas] = useState([]);
//   const [bedroom, setBedroom] = useState([]);
//   const [livingRoom, setLivingRoom] = useState([]);
//   const [outdoor, setOutdoor] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:5000/sofas").then((res) =>
//       setSofas(
//         res.data.map((item, index) => ({
//           id: index + 1,
//           name: item.name,
//           image: item.image,
//         }))
//       )
//     );

//     axios.get("http://localhost:5000/bedroom").then((res) =>
//       setBedroom(
//         res.data.map((item, index) => ({
//           id: index + 1,
//           name: item.name,
//           image: item.image,
//         }))
//       )
//     );

//     axios.get("http://localhost:5000/livingroom").then((res) =>
//       setLivingRoom(
//         res.data.map((item, index) => ({
//           id: index + 1,
//           name: item.name,
//           image: item.image,
//         }))
//       )
//     );

//     axios.get("http://localhost:5000/outdoor").then((res) =>
//       setOutdoor(
//         res.data.map((item, index) => ({
//           id: index + 1,
//           name: item.name,
//           image: item.image,
//         }))
//       )
//     );
//   }, []);

//   const dropdownContent = {
//     Sofas: sofas,
//     Bedroom: bedroom,
//     "Living Room": livingRoom,
//     Outdoor: outdoor,
//   };

//   const handleNavigate = (category) => {
//     const path =
//       category === "Sofas"
//         ? "/sofas"
//         : `/${category.toLowerCase().replace(/\s+/g, "")}`;
//     navigate(path);
//   };

//   return (
// <>
//     <div className="w-screen h-10 p-2 bg-yellow-200 flex justify-between items-center  top-0 left-0 z-50">
//             <p className="ml-10 cursor-pointer">About </p>
//             <p className="ml-28 "> Free delivery on any mattress Australia-wide*</p>
//             <ul className="flex gap-5 cursor-pointer">
//               <li>FAQs</li>
//               <li>Trade</li>
//               <li>Manage my orders</li>
//               <li className="mt-1 mr-2">
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg"
//                   alt="Australian Flag"
//                   width="35.5"
//                 />
//               </li>
//             </ul>
//           </div>

//           {/* -------------Navbar---------------- */}

//           <div
//             className="flex justify-between bg-white w-full  items-center h-16"
//             style={{
//               position: "sticky",
//               top: 0,
//               zIndex: 1000,
//               backgroundColor: "white",
//             }}
//           >
//             <img
//               src={logo}
//               alt="Koala logo"
//               width="100"
//               height="90"
//               className="ml-6 mt-3 cursor-pointer"
//             />

//             {/* <div className="bg-white" style={{ marginTop: "10px" }}>
//               <Navbar />
//             </div> */}
//             <div className="flex gap-5 mr-5 text-xl mt-3 cursor-pointer">
//               <FaSearch />
//               <FaUser />
//               <FaShoppingCart />
//             </div>
//           </div>

//     <div className="w-full relative ">
//       <ul className="flex gap-8  font-medium text-lg cursor-pointer justify-center">
//         <li className="hover:underline">Mattresses</li>
//         <li className="hover:underline">Sofa Beds</li>

//         {["Sofas", "Bedroom", "Living Room", "Outdoor"].map((category) => (
//           <li
//             key={category}
//             className="hover:underline"
//             onMouseEnter={() => setActiveDropdown(category)}
//             onMouseLeave={() => setActiveDropdown(null)}
//           >
//             {category}
//           </li>
//         ))}

//         <li className="hover:underline">Clearance</li>
//       </ul>

//       {activeDropdown && (
//         <div
//           className="fixed top-[108px] left-0 w-screen bg-white shadow-md z-50 p-6"
//           onMouseEnter={() => setActiveDropdown(activeDropdown)}
//           onMouseLeave={() => setActiveDropdown(null)}
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold">
//               {activeDropdown} Collection
//             </h2>
//             <button
//               className="bg-[#808000] text-white px-14 py-2 hover:bg-gray-200 transition rounded-full font-bold"
//               onClick={() => handleNavigate(activeDropdown)}
//             >
//               SHOP ALL {activeDropdown.toUpperCase()}
//             </button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {dropdownContent[activeDropdown]?.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
//                 onClick={() => handleNavigate(activeDropdown)}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-32 object-cover mb-2 rounded"
//                 />
//                 <h2 className="text-base font-medium">{item.name}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sofas, setSofas] = useState([]);
  const [bedroom, setBedroom] = useState([]);
  const [livingRoom, setLivingRoom] = useState([]);
  const [outdoor, setOutdoor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/sofas").then((res) =>
      setSofas(
        res.data.map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: item.image,
        }))
      )
    );

    axios.get("http://localhost:5000/bedroom").then((res) =>
      setBedroom(
        res.data.map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: item.image,
        }))
      )
    );

    axios.get("http://localhost:5000/livingroom").then((res) =>
      setLivingRoom(
        res.data.map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: item.image,
        }))
      )
    );

    axios.get("http://localhost:5000/outdoor").then((res) =>
      setOutdoor(
        res.data.map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: item.image,
        }))
      )
    );
  }, []);

  const dropdownContent = {
    Sofas: sofas,
    Bedroom: bedroom,
    "Living Room": livingRoom,
    Outdoor: outdoor,
  };

  const handleNavigate = (category) => {
    const path =
      category === "Sofas"
        ? "/sofas"
        : `/${category.toLowerCase().replace(/\s+/g, "")}`;
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user"); // (optional) Remove user info
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-[100%] h-10  bg-yellow-200 flex justify-between items-center px-4 text-sm">
        <p className="cursor-pointer">About</p>
        <p className="text-center flex-1">
          Free delivery on any mattress Australia-wide*
        </p>
        <ul className="flex gap-4 items-center cursor-pointer">
          <li>FAQs</li>
          <li>Trade</li>
          <li>Manage my orders</li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg"
              alt="Australian Flag"
              width="30"
              className="cursor-pointer"
            />
          </li>
        </ul>
      </div>

      {/* Logo + Navigation */}
      <div className="flex justify-between items-center bg-white px-6 h-20 ">
        {/* Left: Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Koala logo"
            width="100"
            className="cursor-pointer"
          />
        </Link>

        {/* Center: Nav items */}
        <ul className="flex gap-8 font-medium text-lg cursor-pointer">
          <li className="hover:underline">Mattresses</li>
          <li className="hover:underline">Sofa Beds</li>
          {["Sofas", "Bedroom", "Living Room", "Outdoor"].map((category) => (
            <li
              key={category}
              className="hover:underline"
              onMouseEnter={() => setActiveDropdown(category)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {category}
            </li>
          ))}
          <li className="hover:underline">Clearance</li>
        </ul>

        {/* Right: Icons */}
        <div className="flex gap-5 text-xl cursor-pointer">
          <FaSearch />
          <FaUser />
          <FaShoppingCart />
          <button onClick={handleLogout} className="text-red-500">
            Log Out
          </button>
          {/* <button onClick={handlelogout}>
            <a>Remove Token</a>
          </button> */}
        </div>
      </div>

      {/* Dropdown */}
      {activeDropdown && (
        <div
          className="absolute top-[108px] left-0 w-screen bg-white shadow-md z-40 p-6"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {activeDropdown} Collection
            </h2>
            <button
              className="bg-[#808000] text-white px-14 py-2 hover:bg-gray-200 transition rounded-full font-bold"
              onClick={() => handleNavigate(activeDropdown)}
            >
              SHOP ALL {activeDropdown.toUpperCase()}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dropdownContent[activeDropdown]?.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
                onClick={() => handleNavigate(activeDropdown)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h2 className="text-base font-medium">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
