import React, { useState } from "react";

export default function DropDownSide({
  value,
  name,
  Slide,
  route,
  icon,
  iconangle,
  slide,
  toogle,
}) {
  const [drop, setdrop] = useState(false);
  const toogledrop = () => setdrop(!drop);
  return (
    <>
      <div
        key={name}
        onClick={() => {
          toogledrop();
          if (slide) {
            toogle();
          }
        }}
        className={`${
          !Slide && drop
            ? "bg-black bg-opacity-20 mb-0 mt-2 rounded-t-md"
            : "my-2 rounded-md"
        } cursor-pointer h-12 select-none transition-colors flex items-center mx-2 p-4  hover:bg-black hover:bg-opacity-40`}
      >
        {icon}
        <p className={`my-0 truncate ${Slide ? "hidden" : ""}`}>{name}</p>
        {value && !Slide && iconangle}
      </div>
      {value && !Slide && drop && (
        <div className="fex flex-col bg-white bg-opacity-10 mx-2 mt-0 rounded-b-md">
          {value.map((obj) => (
            <a
              href={obj.route}
              className="block pl-6 py-1 truncate cursor-pointer hover:bg-white hover:bg-opacity-10 "
            >
              {obj.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
