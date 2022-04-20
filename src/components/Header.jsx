import React from "react";
import { useAppContext } from "../context/contextapp";
import { Menu, Transition } from "@headlessui/react";
const navigation = [
  { name: "Dashboard", route: "/" },
  { name: "Usuario", route: "/" },
  { name: "Actividad", route: "/" },
  { name: "Reportar un problema", route: "/" },
];

export default function Header(props) {
  const { Slide } = useAppContext();
  return (
    <header
      style={{ backgroundColor: "#ff6d01" }}
      className="max-h-full z-10 fixed left-0 right-0 top-0"
    >
      <div className="flex items-center h-14 w-full ">
        <div className="w-24 " />
        <div
          className={` truncate ${!Slide ? "w-44" : "w-0"}`}
          style={{ transition: "width 0.25s" }}
        />

        {navigation.map((link) => (
          <a
            key={link.name}
            href={link.route}
            className="select-none cursor-pointer text-base transition-colors font-normal text-white hover:bg-opacity-50 hover:bg-white p-4"
          >
            {link.name}
          </a>
        ))}
        <Menu>
          {({ open }) => (
            <>
              <span className=" ml-auto mr-4">
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out text-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                  <div className="flex justify-center items-center">
                    <span className="mx-6">Cuenta</span>
                    <img
                      className="inline-block h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </Menu.Button>
              </span>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#support"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Soporte
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#license"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Modificar datos
                        </a>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          onClick={props.logout}
                          href="#sign-out"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Cerrar sesion
                        </span>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </header>
  );
}
