import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

function Knowledgebased() {
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar />
      <div className="grid grid-cols-4 p-4">
        <div className="shadow-2xl hover:-translate-y-2  duration-300 p-2 rounded-2xl flex flex-col items-center justify-center m-2">
          <iframe
            className="m-4 rounded-lg"
            width="300"
            height="auto"
            src="https://www.youtube.com/embed/kUz96sbDXAI?si=qJInctemiMFLKf_O"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share m-2"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p className="text-justify w-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          </p>
        </div>
        <div className="shadow-2xl hover:-translate-y-2  duration-300 p-2 rounded-2xl flex flex-col items-center justify-center m-2">
          <iframe
            className="m-4 rounded-lg"
            width="300"
            height="auto"
            src="https://www.youtube.com/embed/NZa7N8xe8Ck?si=ELxsnfPliYHLKsls"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p className="text-justify w-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          </p>
        </div>

        <div className="shadow-2xl hover:-translate-y-2  duration-300 p-2 rounded-2xl flex flex-col items-center justify-center m-2">
          <iframe
            className="m-4 rounded-lg"
            width="300"
            height="auto"
            src="https://www.youtube.com/embed/aswki0f95BA?si=5MEtyvptnTczcxUN"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p className="text-justify w-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          </p>
        </div>
        <div className="shadow-2xl hover:-translate-y-2  duration-300 p-2 rounded-2xl flex flex-col items-center justify-center m-2">
          <iframe
            className="m-4 rounded-lg"
            width="300"
            height="auto"
            src="https://www.youtube.com/embed/bzFT-3QJpWw?si=oe2KQ7oK4zrKFZio"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p className="text-justify w-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          </p>
        </div>
        <div className="shadow-2xl hover:-translate-y-2  duration-300 p-2 rounded-2xl flex flex-col items-center justify-center m-2">
          <iframe
            className="m-4 rounded-lg "
            width="300"
            height="auto"
            src="https://www.youtube.com/embed/_GSeo516Hsw?si=jem4TuaXzupKqFTn"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p className="text-justify w-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          </p>
        </div>
      </div>
    </div>
  );
}

export default Knowledgebased;
