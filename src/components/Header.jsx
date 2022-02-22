import React from "react";
const navigation = [
  { name: "Produccion", href: "#" },
  { name: "Calidad", href: "#" },
  { name: "Issues", href: "#" },
];

export default function Header(props) {
  return (
    <header className="bg-indigo-600 fixed left-0 right-0 top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button onClick={props.logout} className="text-white">
              Log out
            </button>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
          <button onClick={props.logout} className="text-white">
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
}
