import React from "react";

function Button({ name, clickFunction, type, disable }) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={clickFunction}
      className=" bg-[#056674] hover:bg-[#66BFBF]   hover:text-[#FFFFFF] inline-block px-4 py-2 mt-5 rounded-full text-[#FFFFFF] focus:ring-[#056674] focus:outline-none focus:ring focus:ring-opacity-40"
    >
      <span className="relative">{name}</span>
    </button>
  );
}

export default Button;
