import React from "react";
import Lottie from "react-lottie";
import animationData from "./images/Animation - 1714732788444.json";
import animationOfimageLoader from "./images/image-loadder.json";
function Loader({ imageUrl }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: imageUrl ? animationOfimageLoader : animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className={`fixed flex items-center justify-center inset-0 bg-cover bg-center ${
        imageUrl ? `bg-black` : `bg-white`
      } bg-opacity-90 z-50`}
    >
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
