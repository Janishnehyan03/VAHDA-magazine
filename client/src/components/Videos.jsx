import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import YouTube from "react-youtube";
import Axios from "../Axios";

function Videos() {
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    try {
      let { data } = await Axios.get("/videos");
      setVideos(data.videos);
    } catch (error) {
      console.log(error.response);
    }
  };
  const opts = {
    height: "250",
    width: "440",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 capitalize lg:text-4xl text-center my-10">
        Videos
      </h1>

      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        {videos.map((video, index) => (
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6" key={index}>
            <div
              key={index}
              className="px-4 py-4 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl"
            >
              <YouTube videoId={video.videoId} opts={opts} />
            </div>
            <h1 className="text-sm text-indigo-800  lg:text-2xl text-center">
              {video.title}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default Videos;
