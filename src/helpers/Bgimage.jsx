import React from "react";
const Bgimage = ({ backgroundImage }) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};
export { Bgimage };
