import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Foter from "../Foter/Foter";
import { Link } from "react-router-dom";

import { products, faqs } from "../Constdata/Constdata";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Sofas = () => {
  const [allBestsellers, setAllBestsellers] = useState([]);
  const [sofas, setSofas] = useState([]);
  const [filteredSofas, setFilteredSofas] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/bestseller").then((res) => {
      setAllBestsellers(res.data);
      // setFilteredBestsellers(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/sofas").then((res) => {
      setSofas(res.data);
      setFilteredSofas(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedSizes.length === 0 && selectedColors.length === 0) {
      setFilteredSofas(sofas);
      return;
    }

    let filtered = sofas;

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((item) => selectedSizes.includes(item.size));
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((item) => selectedColors.includes(item.color));
    }

    setFilteredSofas(filtered);
  }, [selectedSizes, selectedColors, sofas]);

  const handleChange = (e) => {
    const category = e.target.value;
    if (category === "") {
      setFilteredSofas(sofas); // show all
    } else {
      const filtered = sofas.filter((item) => item.size === category);
      setFilteredSofas(filtered);
    }
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSelectedSizes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setSelectedColors((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <div className="bg-white">
        <Navbar />
      </div>

      <div className="p-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 min-w-full">
          {allBestsellers.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] bg-white rounded-lg shadow-md p-4 flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-bold mb-2 m-4 text-[#686C58]">Sofas</h2>
        <p className="mb-6 m-4 mt-[-8px]">
          Our stylish and comfortable sofas, perfect for any living room.
        </p>
      </div>

      {/* Sidebar Filter */}
      <div className="flex">
        <section className="w-[15%]  h-full  border-gray-200 z-30 flex flex-col items-center bg-white p-4 overflow-y-auto">
          {/* <h2 className="text-[25px] font-normal mt-2 mb-5">Category</h2>
          <div className="mt-4 w-full">
            {[
             
              { label: "1 Seater", value: "1 Seater" },
              { label: "2 Seater", value: "2 Seater" },
              { label: "3 Seater", value: "3 Seater" },
              { label: "4 Seater", value: "4 Seater" },
              { label: "5 Seater", value: "5 Seater" },
              { label: "6 Seater", value: "6 Seater" },
            ].map((item, idx) => (
              <label
                key={idx}
                className="flex relative pl-9 mb-3 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={item.value}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 bg-gray-200  top-[-13px] border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="h-5 w-5  text-blue-600 top-[-13px] border-gray-300 rounded focus:ring-blue-500"></span>
                {item.label}
              </label>
            ))}
          </div> */}
          <h2 className="text-lg font-medium mb-2">Size</h2>
          {[
            "1 Seater",
            "2 Seater",
            "3 Seater",
            "4 Seater",
            "5 Seater",
            "6 Seater",
          ].map((size) => (
            <label key={size} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={size}
                checked={selectedSizes.includes(size)}
                onChange={handleSizeChange}
                className="mr-3 h-4 w-4 "
              />
              {size}
            </label>
          ))}

          {/* <h2 className="text-[25px] font-normal mt-2 mb-5">Color</h2>
          <div className="mt-4 w-full">
            {[
          
              { label: "Gray", value: "Gray" },
              { label: "Beige", value: "Beige" },
              { label: "Dark Blue", value: "Dark Blue" },
              { label: "Charcoal", value: "Charcoal" },
              { label: "Ivory", value: "Ivory" },
              { label: "Olive Green", value: "Olive Green" },
              { label: "Navy", value: "Navy" },
            ].map((item, idx) => (
              <label key={idx} className="flex items-center space-x-[-1] mb-3">
                <input
                  type="checkbox"
                  name="color"
                  value={item.value}
                  onChange={handleColorChange}
                //   checked={selectedColor === item.value}
                   className="h-5 w-5 text-blue-600 bg-gray-200 ml-9 top-[-13px] border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="h-5 w-5  text-blue-600  border-gray-300 rounded focus:ring-blue-500"></span>
                <span>{item.label}</span>
              </label>
            ))}
          </div> */}
          <h2 className="text-lg font-medium mt-4 mb-2">Color</h2>
          <div className="flex flex-col space-y-2">
            {[
              "Gray",
              "Beige",
              "Dark Blue",
              "Charcoal",
              "Ivory",
              "Olive Green",
              "Navy",
            ].map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  value={color}
                  checked={selectedColors.includes(color)}
                  onChange={handleColorChange}
                  className="mr-3 ml-7 accent-black-500 h-4 w-4"
                />
                <span>{color}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Sofa List */}
        <div className="w-[85%] p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSofas?.map((item, idx) => (
              <Link
                to={`/sofa/${item.id}`}
                key={idx}
                className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 block"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">
                  {item.size} • {item.color}
                </p>
                <p>{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------Frequently Asked Questions------------------------ */}

      <div>
        <p className="text-4xl font-bold mb-2 m-6 text-center">
          Frequently Asked Questions
        </p>
      </div>
      <div className="bg-[#F7F7F3] p-6 mt-8 rounded-lg max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-4 font-medium flex justify-between items-center text-gray-800 focus:outline-none"
            >
              {faq.question}
              {activeIndex === index ? (
                <FiChevronUp className="text-xl" />
              ) : (
                <FiChevronDown className="text-xl" />
              )}
            </button>
            {activeIndex === index && (
              <div className="pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* -------------------------Category Section------------------------- */}
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

export default Sofas;
