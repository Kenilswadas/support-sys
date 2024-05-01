import React from "react";

function Button({ name, clickFunction, type, disable }) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={clickFunction}
      className=" bg-[#E0ECE4] hover:bg-[#66BFBF] border-2  border-[#66BFBF] hover:text-[#FFFFFF] inline-block px-4 py-2 mt-5 rounded-full text-[#FF4B5C] focus:ring-[#66BFBF] focus:outline-none focus:ring focus:ring-opacity-40"
    >
      <span className="relative">{name}</span>
    </button>
  );
}

export default Button;
