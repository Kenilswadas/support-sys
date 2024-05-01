import React from "react";

function SquareBtn({ name, clickFunction, type, disable, faicon }) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={clickFunction}
      className=" bg-[#E0ECE4] hover:bg-[#66BFBF] border-2 border-[#66BFBF] hover:text-[#FFFFFF] flex items-center justify-center px-2 py-1 mt-5 rounded-xl text-[#FF4B5C] ml-2"
    >
      <span className="relative">{name}</span>
      <span className="relative ml-2">{faicon}</span>
    </button>
  );
}

export default SquareBtn;
