import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const navigation = [
  { name: "Produccion", content: { saludo: "hola" } },
  { name: "Calidad", href: "#" },
  { name: "Issues", href: "#" },
];
export default function Sidebar() {
  return (
    <>
      <div className=" top-14 left-0 fixed px-3 py-4 overflow-y-auto rounded h-full bg-gray-800 dark:bg-gray-800">
        <aside className="w-64" aria-label="Sidebar">
          <div className="">
            <ul className=" text-white">
              {navigation.map((obj) => (
                <li className="flex items-center space-y-2 m-2 p-4 rounded-md hover:bg-gray-600">
                  {obj.name}
                  {obj.content && (
                    <FontAwesomeIcon className="ml-auto" icon={faAngleDown} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
