import React from "react";
import { FaBox, FaTag } from "react-icons/fa"; // Importing icons for product and category

function VideoCard({ src, productName, category }) {
  return (
    <div className="w-full h-auto p-4 m-2 bg-white rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
      <div className="w-full h-48 overflow-hidden rounded-t-xl">
        <iframe
          src={`https://www.youtube.com/embed/${src}`}
          title={category}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-2 text-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2  items-center mb-1">
          <div className="flex items-center mb-1 sm:mb-0">
            <FaBox className="mr-2 text-gray-500" />
            <span className="font-semibold">Product Name:</span>
          </div>
          <span className="text-sm">{productName}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center">
          <div className="flex items-center mb-1 sm:mb-0">
            <FaTag className="mr-2 text-gray-500" />
            <span className="font-semibold">Category:</span>
          </div>
          <span className="text-md">{category}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
