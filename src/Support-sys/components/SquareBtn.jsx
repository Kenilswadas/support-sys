import React from "react";

function SquareBtn({ name, clickFunction, type, disable, faicon }) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={clickFunction}
      className=" bg-[#77B0AA] hover:bg-[#135D66] border-2 border-[#135D66] hover:text-[#FFFFFF] flex items-center justify-center px-2 py-1 mt-5 rounded-xl text-[#FFFFFF]"
    >
      <span className="relative">{name}</span>
      <span className="relative ml-2">{faicon}</span>
    </button>
  );
}

export default SquareBtn;
