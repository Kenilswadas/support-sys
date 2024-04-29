import React from "react";

function Button({ name, clickFunction, type, disable }) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={clickFunction}
      className=" bg-[#77B0AA] hover:bg-[#135D66]   hover:text-[#FFFFFF] inline-block px-4 py-2 mt-5 rounded-full text-[#FFFFFF]"
    >
      <span className="relative">{name}</span>
    </button>
  );
}

export default Button;
