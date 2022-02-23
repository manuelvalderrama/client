import React from "react";
const navigation = [
  { name: "Usuario", href: "#" },
  { name: "Actividad", href: "#" },
  { name: "Reportar un problema", href: "#" },
];

export default function Header(props) {
  return (
    <header className="bg-yellow-500 z-10 fixed left-0 right-0 top-0">
      <div className="flex items-center h-16 ml-10 w-full space-x-8">
        {navigation.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-base font-medium text-white hover:text-indigo-50"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={props.logout}
          className="m-auto text-base font-medium text-white hover:text-indigo-50 mx-4 rounded-md bg-gray-500 p-2 my-0"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
