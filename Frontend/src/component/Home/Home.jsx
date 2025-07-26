import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { FaSearch, FaUser, FaShoppingCart, FaStar } from "react-icons/fa";
// import { FaTruck, FaMoon, FaShieldAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import video from "../../assets/video.mp4";
import Navbar from "../Navbar/Navbar";
import Sofas from "../Sofa/Sofas";
import axios from "axios";
import Foter from "../Foter/Foter";
import { products, whykoala, aboutus } from "../Constdata/Constdata";

const Home = () => {
  const [allBestsellers, setAllBestsellers] = useState([]);
  const [selectedBestsellers, setSelectedBestsellers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredBestsellers, setFilteredBestsellers] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [allMattresses, setAllMattresses] = useState([]);
  const [selectedSize, setSelectedSize] = useState("Queen");

  const [categoriesss, setCategories] = useState([]);

  const API_BASE = import.meta.env.VITE_BASE_URL;
  const UPLOAD_BASE =
    import.meta.env.VITE_UPLOAD_URL || "http://localhost:3000/uploads";

    const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image); // `imageFile` from input

  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/categories`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Category added!");
  } catch (err) {
    console.error("Error submitting category:", err);
  }
};

useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories on home page:", err);
    }
  };
  // fetchCategories();
  // }, [];

  const categories = ["Featured", "Sofa Beds", "Sofas", "Mattresses"];

  const sizeOptions = ["Single", "Double", "Queen", "King"];

  useEffect(() => {
    axios.get("http://localhost:5000/bestseller").then((res) => {
      setAllBestsellers(res.data);
      setFilteredBestsellers(res.data);
    });
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === "Featured") {
      setFilteredBestsellers(allBestsellers);
    } else {
      const filtered = allBestsellers.filter(
        (item) => item.category === category
      );
      setFilteredBestsellers(filtered);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/mattresses").then((res) => {
      setAllMattresses(res.data);
    });
  }, []);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const filteredMattresses = allMattresses.filter(
    (item) => item.size === selectedSize
  );

  useEffect(() => {
    axios.get("http://localhost:5000/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);
  return (
    <>
      {/* <div className="w-[100%] h-10 p-2  bg-yellow-200 flex justify-between">
        <p className="ml-10 cursor-pointer">About </p>
        <p className="ml-28 "> Free delivery on any mattress Australia-wide*</p>
        <ul className="flex gap-5 cursor-pointer">
          <li>FAQs</li>
          <li>Trade</li>
          <li>Manage my orders</li>
          <li className="mt-1 mr-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg"
              alt="Australian Flag"
              width="35.5"
            />
          </li>
        </ul>
      </div> */}

      {/* -------------Navbar---------------- */}

      {/* <div
        className="flex justify-between bg-white w-full  items-center h-16"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <img
          src={logo}
          alt="Koala logo"
          width="100"
          height="90"
          className="ml-6 mt-3 cursor-pointer"
        />

        <div className="flex gap-5 mr-5 text-xl mt-3 cursor-pointer">
        <FaSearch />
        <FaUser />
        <FaShoppingCart />
        </div>
        </div> */}
      <div className="bg-white">
        <Navbar />
      </div>

      <div className="flex space-x-1 items-center justify-center bg-gray-100 h-10">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <p>100,000+ five star reviews</p>
      </div>

      {/* -----------Video Section---------------- */}

      <div className="h-[550px] w-full overflow-hidden ">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-start mt-32 ml-10 font-bold ">
          <div className=" text-white p-6 rounded-lg max-w-md text-left ">
            <h2 className="text-8xl md:text-6xl font-bold mb-4">
              Softer. Smarter. Seriously stylish.
            </h2>
            <p className="text-lg mb-6 ">
              The reimagined Byron Sofa Bed 3rd Gen
            </p>
            <button className="bg-white text-black px-14 py-2 hover:bg-gray-200 transition rounded-full font-bold">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-1  justify-center bg-green-50 gap-6 h-10">
        <p className="flex items-center gap-2">
          <CiDeliveryTruck className="text-2xl" />
          Fast delivery
        </p>
        <p className="flex items-center gap-2">
          <SlCalender />
          120-night trial
        </p>
        <p className="flex items-center gap-2">
          <GoShieldCheck />
          World-class warranty
        </p>
      </div>

      {/* ----------Category Section---------------- */}
      <div>
        <h1 className="text-4xl p-6 font-bold">Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6  cursor-pointer">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-center bg-[#f9f9f4]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <p className="mt-4 text-lg font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------admin side Category--------------  */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesss.map((cat) => (
            <div
              key={cat._id}
              className="border p-3 rounded shadow hover:shadow-md transition"
            >
              <img
                src={`${UPLOAD_BASE}/${cat.image}`}
                alt={cat.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <p className="text-center font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ----------Best Sellers Section---------------- */}

      <div>
        <div>
          <p className="text-4xl p-6 font-bold">
            Bestsellers
            <span className="float-right text-lg text-black-100 font-normal mt-5 underline cursor-pointer">
              See All
            </span>
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-4 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold ${
                activeCategory === cat
                  ? "bg-[#808000] text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            <button className="bg-gray-100 text-black p-2 rounded-full">
              <MdKeyboardArrowLeft className="text-2xl" />
            </button>
            <button className="bg-gray-100 text-black p-2 rounded-full">
              <MdKeyboardArrowRight className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Card Slider */}
        <div className="p-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 min-w-full">
            {filteredBestsellers.map((item) => (
              <div
                key={item.id}
                className="min-w-[300px] bg-white rounded-lg shadow-md p-4 flex-shrink-0"
              >
                <img
                  src={`https:${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm">{item.size}</p>
                <p className="text-md">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------Awarded Section---------------- */}

      <div>
        <div>
          <p className="text-4xl p-6 font-bold">
            Australia's most awarded mattress brand
            <span className="float-right text-lg text-black-100 font-normal mt-5 underline cursor-pointer">
              See All
            </span>
          </p>
        </div>

        <div className="gap-6 p-6 flex flex-wrap">
          {sizeOptions.map((size) => (
            <button
              key={size}
              className={`px-8 py-2 rounded-full font-semibold ${
                selectedSize === size
                  ? "bg-[#808000] text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 p-6 gap-6">
          {filteredMattresses.map((item) => (
            <div key={item.id} className="border rounded p-4 shadow">
              <img
                src={`https:${item.image}`}
                alt={item.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <h2 className="text-sm">{item.size}</h2>
              <h2 className="text-md">{item.price}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------Right Mattress section-------------- */}

      <div className="w-[90%] h-50 bg-[#F7F7F3] rounded-5xl flex mx-auto py-1 items-center justify-center">
        <div>
          <p className="text-3xl p-6 font-bold">
            Not sure which mattress is right for you?
          </p>
        </div>
        <div className="ml-[250px] gap-10 cursor-pointer text-center ">
          <button className="bg-gray-200 text-black px-8 py-2 rounded-full font-semibold mr-8 border border-transparent hover:border-black transition ">
            TAKE THE QUIZ
          </button>
          <button className="bg-gray-200 text-black px-8 py-2 rounded-full font-semibold border border-transparent hover:border-black transition ">
            COMPARE MATTRESSES
          </button>
        </div>
      </div>

      {/* ----------------New Arrivala-------------- */}

      {/* <div>
        <div>
          <p className="text-4xl p-6 font-bold">
            New arrivals
            <span className="float-right text-lg text-black-100 font-normal mt-5 underline cursor-pointer">
              See All
            </span>
          </p>
        </div>

        <div className="gap-6 p-6 px-auto flex flex-wrap">
          <button className="bg-[#808000] text-white px-8 py-2 rounded-full font-semibold">
            Featured
          </button>
          <button className="bg-gray-100 text-black px-8 py-2  rounded-full font-semibold">
            Living Room
          </button>
          <button className="bg-gray-100 text-black px-8 py-2  rounded-full font-semibold">
            Homewares
          </button>

          <div className="ml-[850px] gap-8 ">
            <button className="bg-gray-100 text-black px-3 py-3  rounded-full font-semibold mr-3">
              <MdKeyboardArrowLeft className=" text-2xl" />
            </button>
            <button className="bg-gray-100 text-black px-3 py-3  rounded-full font-semibold">
              <MdKeyboardArrowRight className=" text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 cursor-pointer">
        <div className="overflow-x-auto scroll-smooth scrollbar-hide">
          <div className="flex space-x-4 min-w-full">
            {allBestsellers.map((item) => (
              <div
                key={item.id}
                className="min-w-[350px] bg-white rounded-lg shadow-md p-4 flex-shrink-0"
              >
                <img
                  src={`https:${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm ">{item.size}</p>
                <p className="text-md ">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* ------------Review Section------------------ */}

      <div className="flex items-center justify-between p-6">
        <div>
          <div className="flex text-4xl">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="text-4xl font-semibold ">
            <p>
              Over <span className="text-[#686C58]">570,000</span> customers
              <br />
              and more than <span className="text-[#686C58]">50,000</span>{" "}
              five-star reviews globally
            </p>
          </div>
        </div>

        {/* Right-aligned buttons */}
        <div className="flex gap-4 ml-6 mt-[70px]">
          <button className="bg-gray-100 text-black px-3 py-3 rounded-full font-semibold">
            <MdKeyboardArrowLeft className="text-2xl" />
          </button>
          <button className="bg-gray-100 text-black px-3 py-3 rounded-full font-semibold">
            <MdKeyboardArrowRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div className="p-6 cursor-pointer">
        <div className="overflow-x-auto scroll-smooth scrollbar-hide w-full">
          <div className="flex space-x-4 min-w-full">
            {reviews.map((item) => (
              <div
                key={item.id}
                className=" bg-white border rounded-lg shadow-md p-4 flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1 max-w-[350px]">
                  {item.data}
                </p>
                <p className="mt-2 font-medium">{item.customername}</p>
                <p className="text-xs text-gray-500">{item.buyer}</p>
                <button className="mt-3 text-black underline text-sm hover:text-blue-800 transition">
                  {item.shop}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------Why Koala------------------- */}

      <div>
        <div>
          <p className="text-[#686C58] items-center justify-center text-center ">
            Why Koala?
          </p>
          <p className="text-center text-4xl font-semibold">
            We’re in the business of making things good
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6  cursor-pointer">
            {whykoala.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-center bg-[#f9f9f4]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-66 rounded-[15px] object-contain"
                />
                <p className="mt-4 text-lg font-medium">{product.name}</p>
                <p className="mt-4 text-lg text-justify">
                  {product.discription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------about us section-------------------- */}

      <div>
        <div className="flex items-center justify-between p-6">
          <p className="text-4xl font-semibold">A little about us</p>
          <button className=" text-black px-6 py-3 rounded-full font-semibold  border border-black">
            LEARN MORE
          </button>
        </div>
      </div>

      <div className="relative w-full mt-[-20px] rounded-lg ">
        <img
          src="//au.koala.com/cdn/shop/files/Forest_image_1.png?v=1732492791&width=1680"
          alt="Koala Forest"
          className="w-full h-[300px] p-6 rounded-lg object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between px-12 py-8 text-white">
          <div className="max-w-md text-left space-y-2">
            <p className="text-4xl font-semibold">
              Protecting Koalas,
              <br />
              Preserving Tomorrow.
              <br />
              Together with
              <br />
              WWF-Australia
            </p>
          </div>

          <div className="max-w-lg text-left  space-y-2">
            <p className="text-lg text-justify">
              Together with WWF-Australia, we're on a mission
              <br />
              to help koalas thrive. Through our partnership under
              <br />
              the Koalas Forever program, we're working to double
              <br />
              the koala population along Australia's east coast by 2050.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 cursor-pointer mt-[-25px]">
          {aboutus.map((product, index) => (
            <div
              key={index}
              className="rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-start bg-[#F7F7F3]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain mb-4 self-start"
              />
              <p className="text-lg font-medium">{product.name}</p>
              <p className="mt-2 text-lg text-justify">{product.discription}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------Subscribe------------------ */}

      <div className=" w-[100%] h-[150px] bg-[#F7F7F3] rounded-5xl flex mt-20 justify-center ">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold mt-10">Subscribe to our emails</p>
          <p className="text-md mt-2 ">
            Be the first to know about new collections and exclusive offers.
          </p>
        </div>
      </div>
      <Foter />
    </>
  );
};

export default Home;
