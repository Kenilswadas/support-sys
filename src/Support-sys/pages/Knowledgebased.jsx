import React from "react";
import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";

function Knowledgebased({ viewLogin, setViewLogin, userName, setUserName }) {
  return (
    <div className="max-sm:w-full max-md:w-full">
      <Navbar
        viewLogin={viewLogin}
        setViewLogin={setViewLogin}
        userName={userName}
        setUserName={setUserName}
      />
      <section className="grid grid-cols-4 p-4">
        <VideoCard
          src="https://www.youtube.com/embed/kUz96sbDXAI?si=qJInctemiMFLKf_O"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,"
        />
        <VideoCard
          src="https://www.youtube.com/embed/NZa7N8xe8Ck?si=ELxsnfPliYHLKsls"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,"
        />
        <VideoCard
          src="https://www.youtube.com/embed/aswki0f95BA?si=5MEtyvptnTczcxUN"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,"
        />
        <VideoCard
          src="https://www.youtube.com/embed/bzFT-3QJpWw?si=oe2KQ7oK4zrKFZio"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,"
        />
        <VideoCard
          src="https://www.youtube.com/embed/_GSeo516Hsw?si=jem4TuaXzupKqFTn"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,"
        />
      </section>
    </div>
  );
}

export default Knowledgebased;
