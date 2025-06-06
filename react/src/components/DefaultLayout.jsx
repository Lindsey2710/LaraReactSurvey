import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/20/solid";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import surveyImage from "../assets/survey.png";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useEffect } from "react";
import Toast from "./Toast";


const navigation = [
  { name: "Dashboard", to: "/" },
  { name: "Surveys", to: "/surveys" },
  { name: "Info", to: "/info" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();

  if (!userToken) {
    return <Navigate to="login" />;
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout")
      .then((res) => {
        setCurrentUser({});
        setUserToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get('/me')
      .then(({ data }) => {
        setCurrentUser(data)
      })
  }, [])

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Surveys"
                    src={surveyImage}
                    className="mx-auto h-12 w-auto"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-md font-bold"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="w-10 h-10 bg-gray-600 p-2 rounded-full text-white hover:bg-black" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <a
                          href="#"
                          onClick={(ev) => logout(ev)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Logout
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserIcon className="w-10 h-10 bg-gray-600 p-2 rounded-full text-white hover:bg-black" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {currentUser.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton>
                  <a
                    href="#"
                    onClick={(ev) => logout(ev)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400
                     hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </a>
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
        <Outlet />
        <Toast />
      </div>
    </>
  );
}
