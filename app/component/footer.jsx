import React from "react";

import {
  FaTruck,
  FaGift,
  FaHeadphones,
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
  FaRegCommentDots,
} from "react-icons/fa";

import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineAssignmentReturn } from "react-icons/md";

const Footer = () => {
  const paymentMethods = [
    "visa.png",
    "master_card.png",
    "american_express.pngzz",
    "paypal.png",
    "carte_bleue.png",
  ];

  return (
    <footer className="bg-[#fafafa] text-[#273449]">

      
      {/* ================= MAIN FOOTER ================= */}
      <section className="border-t border-gray-200 mt-5" >
        <div className="container mx-auto px-5 py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* ================= CONTACT US ================= */}
            <div className="lg:border-r border-gray-200 lg:pr-10">

              <h2 className="text-[23px] font-semibold mb-5">
                Contact Us
              </h2>

              <p className="text-[16px] leading-6 text-gray-900">
                BroBazar - Mega Super Store
                <br />
                507-Union Trade Centre France
              </p>

              <p className="font-medium mt-5 text-gray-700">
                someone@example.com
              </p>

              <p className="text-[#08b89d] text-[22px] font-bold mt-5">
                (+91) 9876543210
              </p>

              <div className="flex items-center gap-4 mt-6">

                <FaRegCommentDots className="text-[#08b89d] text-[38px]" />

                <div>
                  <p className="font-medium text-[17px]">
                    Online Chat
                  </p>

                  <p className="font-medium text-[17px]">
                    Get Expert Help
                  </p>
                </div>

              </div>

            </div>


            {/* ================= PRODUCTS ================= */}
            <div>

              <h2 className="text-[23px] font-semibold mb-5">
                Products
              </h2>

              <ul className="space-y-3 text-gray-500 font-medium">

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Prices drop
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  New products
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Best sales
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Contact us
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Sitemap
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Stores
                </li>

              </ul>

            </div>


            {/* ================= OUR COMPANY ================= */}
            <div>

              <h2 className="text-[23px] font-semibold mb-5">
                Our Company
              </h2>

              <ul className="space-y-3 text-gray-500 font-medium">

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Delivery
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Legal Notice
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Terms and conditions of use
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  About us
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Secure payment
                </li>

                <li className="hover:text-[#08b89d] cursor-pointer">
                  Login
                </li>

              </ul>

            </div>


            {/* ================= NEWSLETTER ================= */}
            <div>

              <h2 className="text-[23px] font-semibold mb-5">
                Subscribe to newsletter
              </h2>

              <p className="text-gray-800 mb-5 leading-6">
                Subscribe to our latest newsletter to get news about
                special discounts.
              </p>

              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-[44px] border border-gray-200 rounded-lg px-4 outline-none focus:border-[#08b89d]"
              />

              <button
                className="mt-5 bg-[#08b89d] text-white font-bold px-5 py-3 rounded-md hover:bg-[#079d88] transition"
              >
                SUBSCRIBE
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* ================= BOTTOM FOOTER ================= */}
      <section className="border-t border-gray-200">

        <div className="container mx-auto px-5 py-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            {/* ================= SOCIAL ICONS ================= */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#08b89d] cursor-pointer transition">
                <FaFacebookF />
              </div>

              <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#08b89d] cursor-pointer transition">
                <FaYoutube />
              </div>

              <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#08b89d] cursor-pointer transition">
                <FaPinterestP />
              </div>

              <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#08b89d] cursor-pointer transition">
                <FaInstagram />
              </div>

            </div>


            {/* ================= COPYRIGHT ================= */}
            <p className="text-gray-900 text-[17px]">
              © Ecommerce Template
            </p>


            {/* ================= PAYMENT METHODS ================= */}
            <div className="flex items-center gap-2">

              {paymentMethods.map((payment, index) => (
                <div
                  key={index}
                  className="w-[50px] h-[30px] border border-gray-200 rounded-sm bg-white flex items-center justify-center"
                >
                  <img
                    src={`https://brobazar-8u3j.vercel.app/${payment}`}
                    alt={payment}
                    className="max-w-[42px] max-h-[22px] object-contain"
                  />
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

    </footer>
  );
};

export default Footer;