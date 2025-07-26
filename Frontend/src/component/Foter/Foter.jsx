import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiGoogledrive, SiBmcsoftware } from "react-icons/si";
import { TbPlanet } from "react-icons/tb";

const Foter = () => {
  return (
    <div className="bg-[#5a6149] text-white px-6 py-10">
      <div className="max-w-7xl mx-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">koála</h2>
          <p className="mb-2">
            In the spirit of reconciliation, Koala acknowledges the Traditional
            Custodians of Country throughout Australia and their connections to
            land, sea and community.
          </p>
          <p className="mb-4">
            We pay our respect to their Elders past and present and extend that
            respect to all Aboriginal and Torres Strait Islander peoples today.
          </p>
          <div className="flex space-x-6 text-xl mb-4">
            <FaFacebookF />
            <FaInstagram />
          </div>
          <div className="flex items-center space-x-6 mt-4 text-4xl">
            <SiGoogledrive />
            <SiBmcsoftware />
            <TbPlanet />
          </div>
        </div>

        <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold mx-2 mb-2">Help</h3>
            <ul className="space-y-1 text-sm">
              <li>Request Delivery Change</li>
              <li>Contact & FAQs</li>
              <li>Finance Options</li>
              <li>My Account</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">About</h3>
            <ul className="space-y-1 text-sm">
              <li>About Us</li>
              <li>Our Impact</li>
              <li>Trade & Commercial</li>
              <li>Koala Second Home</li>
              <li>Koala Showroom</li>
              <li>Careers</li>
              <li>press@koala.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Resources</h3>
            <ul className="space-y-1 text-sm">
              <li>Delivery</li>
              <li>120-night trial</li>
              <li>Warranty</li>
              <li>Treetops Blog</li>
              <li>Refer a Friend</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Shop</h3>
            <ul className="space-y-1 text-sm">
              <li>Mattresses</li>
              <li>Sofa Beds</li>
              <li>Sofas</li>
              <li>Bedroom</li>
              <li>Living Room</li>
              <li>Outdoor</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="mt-5" />

      <div className="mt-5  text-sm flex flex-wrap items-center gap-4">
        <p>© 2025 Koala</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Website Terms
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Promotion Terms
          </a>
        </div>
        <img
          src="https://au.koala.com/cdn/shop/files/Payment_Icons_AU.svg?v=1736813926&width=194"
          alt="Payment Icons"
          className="w-auto h-8 flex items-right justify-end mt-2 ml-auto"
        />
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default Foter;
