import React from "react";

function VideoCard({ src, description }) {
  return (
    <div className="shadow-2xl hover:-translate-y-2 duration-300 p-2 rounded-2xl flex flex-col items-center justify-center m-2">
      <iframe
        className="m-4 rounded-lg"
        width="300"
        height="auto"
        src={src}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <p className="text-justify w-80">{description}</p>
    </div>
  );
}

export default VideoCard;
