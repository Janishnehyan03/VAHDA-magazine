import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import Axios from "../Axios";
import { UserContext } from "../context/User";
import { useContext } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);
  const logout = async () => {
    try {
      let res = await Axios.post("/users/logout");
      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCategories = async () => {
    let { data } = await Axios.get("/categories");
    setCategories(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <NavLink  to={"/"}>
                <div className="flex">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <h1 className="text-2xl font-bold mx-4 text-white">VAHDA</h1>
                </div>
              </NavLink>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4 relative">
                  {user && (
                    <NavLink
                    activeClassName="text-white bg-gray-900"
                      to={"/dashboard"}
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </NavLink>
                  )}

                  {categories.map((category) => (
                    <NavLink
                      to={"/category/" + category._id}
                      key={category._id}
                      activeClassName="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {category.name}
                    </NavLink>
                  ))}
                  <NavLink
                    activeClassName="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    to={"/videos/"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    videos
                  </NavLink>
                  <NavLink
                    activeClassName="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    to={"/contact/"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact us
                  </NavLink>
                </div>
                {user ? (
                  <>
                    <div className="absolute right-32 top-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                      hi, {user.name}
                    </div>
                    <div
                      onClick={logout}
                      className="absolute right-2 top-2 bg-red-800 px-6 py-2 rounded-2xl text-white hover:bg-white hover:text-red-400 transition hover:font-semibold cursor-pointer"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <Link
                    to={"/login"}
                    className="absolute right-2 top-2 bg-green-400 px-6 py-2 rounded-2xl hover:bg-white hover:text-green-400 transition hover:font-semibold"
                  >
                    login
                  </Link>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden h-screen" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Link
                  to={"/dashboard"}
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>

                {categories.map((category) => (
                  <Link
                    to={`/category/${category._id}`}
                    key={category._id}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  to={`/videos/`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Videos
                </Link>
                <Link
                  to={`/contact/`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact us
                </Link>
                {user ? (
                  <Link className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Hi, {user.name}
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
