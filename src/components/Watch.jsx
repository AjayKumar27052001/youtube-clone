import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { embedVideo_key } from "../utils/constants";
import videoContext from "../utils/videoContext";
import Comments from "./Comments";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const { selectedVideo } = useContext(videoContext); // Get selected video details

  //if (!selectedVideo) return <div>Loading...</div>;
  const { title, channelTitle, viewCount, likeCount, description } =
    selectedVideo || {};

  return (
    <div className="px-2 pt-20 max-w-4xl">
      <iframe
        className="w-full h-[75vh] shadow-amber-50 rounded-md"
        src={embedVideo_key + videoId + "?autoplay=1"}
      ></iframe>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>

        <div className="flex  text-gray-500 text-sm mt-2">
          <span className="text-gray-600 font-bold text-sm truncate mx-5">
            {channelTitle}
          </span>
          <span className="mx-5 font-semibold">
            {viewCount ? "👁" + viewCount + "views" : ""}
          </span>
          <span className="mx-5 font-semibold">
            {likeCount ? "👍" + likeCount + "likes" : ""}
          </span>
        </div>
        <p className="text-gray-500  text-sm mt-2 truncate-3-lines bg-gray-100 py-3 rounded-md">
          {description}
        </p>
      </div>
      <div>
        <h1 className="font-extrabold text-2xl">Comments</h1>
        <div className="py-2">
          <Comments videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
