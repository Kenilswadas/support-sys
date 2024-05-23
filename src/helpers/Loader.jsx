import React from "react";
import Lottie from "react-lottie";
import animationData from "./images/Animation - 1714732788444.json";
function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-cover bg-center bg-[#ffffff] bg-opacity-90 z-50">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        // style={{ color: "green" }}
        className={"text-green-400"}
      />
    </div>
  );
}

export default Loader;
