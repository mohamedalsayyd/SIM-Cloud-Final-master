import React, { useContext, useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { SlBag } from "react-icons/sl";
import CategoryNavMobile from "./CategoryNavMobile";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import SearchForm from "./SearchForm";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";
import { Toaster } from 'react-hot-toast';

const Header = () => {
  const { isOpen, setIsOpen, itemsAmount } = useContext(CartContext);
  const [catNavMobile, setCatNavMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [account, setAccount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:9000/u");
      const data = await res.json();
      setAccount(data);
    };

    fetchData(); // call the fetchData function to fetch the data
  }, []);

  return (
    <header className="bg-primary py-6 fixed w-full top-0 z-40 lg:relative xl:mb-[30px]">
      <div className=" container mx-auto">
        <div className="flex flex-row gap-4 lg:items-center justify-between mb-4 xl:mb-0">
          <div
            onClick={() => setCatNavMobile(true)}
            className="text-3xl xl:hidden cursor-pointer"
          >
            <FiMenu />
          </div>
          <div
            className={`${
              catNavMobile ? "left-0" : "-left-full"
            } fixed top-0 bottom-0 z-30 w-full h-screen transition-all duration-200`}
          >
            <CategoryNavMobile setCatNavMobile={setCatNavMobile} />
          </div>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="hidden w-full xl:flex xl:max-w-[734px]">
            <SearchForm />
          </div>
          <div className="flex items-center gap-x-[10px] z-50">
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-sm font-medium text-black  hover:border-gray-300 bg-accent p-2 rounded transition duration-150 ease-in-out"
                >
                  <span>Profile</span>
                </button>
              </div>
              <div
                className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <div className="py-1" role="none">
                  <Link
                    className="flex items-center  px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU"
                      alt=""
                    />
                    <span className="flex-1">{account.name || "Unknown"}</span>
                  </Link>
                  <span className="flex items-center px-2 py-1 text-gray-700/75">
                    Email: {account.email || "Unknown" }
                  </span>
                  <span className="flex items-center px-2 py-1 text-gray-700/75">
                    Phone: +20 {account.phone}
                  </span>
                  <span className="flex items-center px-2 py-1 text-gray-700/75">
                    Orders: {account.orders || "0"}
                  </span>
                </div>

                <div className="py-1" role="none">
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    href="/logout"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" relative cursor-pointer"
            >
              <SlBag className="text-2xl" />
              <div
                className="bg-accent text-primary absolute w-[18px] h-[18px] rounded-full top-3 -right-1 text-[13px] flex justify-center items-center font-bold tracking-[-0.1em]
              "
              >
                {itemsAmount}
              </div>
            </div>
            <div
              className={`
            ${isOpen ? "right-0" : "-right-full"}
            bg-[#0e0f10] shadow-xl fixed top-0 bottom-0 w-full z-10 md:max-w-[500px] transition-all duration-300`}
            >
              <Cart />
              <Toaster position="top-center" />
            </div>
          </div>
        </div>
        <div className="xl:hidden">
          <SearchForm />
        </div>
      </div>
    </header>
  );
};

export default Header;
