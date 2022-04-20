import React from "react";
import logo from "../../img/linio_dark.png";
import logo_s from "../../img/L_dark.png";
import DropDownSide from "./dropDownSide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPen,
  faToolbox,
  faCheck,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context/contextapp";

export default function Sidebar() {
  const navigation = [
    {
      name: "Creación",
      icon: faPen,
      route: "/creacion",
      sub: [
        { name: "Platnillas", route: "/plantilla" },
        { name: "Comprobación de carga SC", route: "/" },
        { name: "Content Score", route: "/" },
        { name: "Concentrado", route: "/" },
        { name: "Carga por script", route: "/" },
      ],
    },
    {
      name: "Content Tools",
      icon: faToolbox,
      route: "/",
      sub: [{ name: "Content Tools" }, { name: "Content Tools Masivo" }],
    },
    { name: "Bandeja de Pendientes", icon: faCheck, route: "/" },
    { name: "Calidad", icon: faCalendar, route: "/" },
  ];
  const { Slide, toogleSlide } = useAppContext();
  return (
    <>
      <div
        className="z-20 max-h-screen px-0 pb-4 pt-1"
        style={{ backgroundColor: "#ff6d01" }}
      >
        <aside
          className={`transition-[width] h-full ${Slide ? "w-16" : "w-60"}`}
          style={{ transition: "width 0.25s" }}
          aria-label="Sidebar"
        >
          <div className="flex flex-col h-full">
            <ul className=" text-white">
              <li
                onClick={toogleSlide}
                key="#"
                className="flex font-normal cursor-pointer select-none transition-colors mx-2 rounded-md hover:bg-opacity-40 hover:bg-black"
              >
                {Slide ? (
                  <img src={logo_s} alt="#" className="h-14 mx-auto" />
                ) : (
                  <img src={logo} alt="#" className="h-14 mx-auto" />
                )}
              </li>
              <div className="flex justify-end mx-4"></div>
              {navigation.map((obj) => (
                <DropDownSide
                  value={obj.sub}
                  Slide={Slide}
                  name={obj.name}
                  route={obj.route}
                  icon={
                    <FontAwesomeIcon
                      className={`${Slide ? "" : "mr-2"}`}
                      icon={obj.icon}
                    />
                  }
                  slide={Slide}
                  toogle={toogleSlide}
                  iconangle={
                    <FontAwesomeIcon className="ml-auto" icon={faAngleDown} />
                  }
                />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
