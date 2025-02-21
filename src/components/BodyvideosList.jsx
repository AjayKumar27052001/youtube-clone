import { useEffect, useState } from "react";
import { api_Url } from "../utils/constants";
import useFetch from "../utils/useFetch";
import { useNavigate } from "react-router-dom";
import videoContext from "../utils/videoContext";
import { useContext } from "react";
import Comments from "./Comments";
import searchContext, { useSearch } from "../contexts/searchContext";

const BodyvideosList = () => {
  const { videodata, setVideoData } = useSearch();
  //const [videodata,setVideo]
  console.log("videodata at useContext" + videodata);
  const { data, loading, errorData } = useFetch(api_Url);
  //const [videoData,set]

  const navigate = useNavigate();
  const { setSelectedVideo } = useContext(videoContext);
  useEffect(() => {
    if (data?.items) setVideoData(data.items); //here i should put data? because intially data=[]
    console.log(data);
    console.log(loading);
    console.log(errorData);
  }, [data]);
  if (loading) return <div>Loading...</div>;
  if (errorData) return <div>Error: {errorData.message}</div>;

  return (
    <div className="p-4 pt-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videodata.length === 0 ? (
        <div>No videos found</div>
      ) : (
        videodata.map((item) => {
          const { channelTitle, description, title, thumbnails } =
            item?.snippet || {};
          const { viewCount, likeCount } = item?.statistics || {};

          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedVideo({
                  viewCount,
                  likeCount,
                  title,
                  channelTitle,
                  description,
                });
                navigate(`/watch?v=${item.id}`);
              }}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={thumbnails?.medium?.url}
                alt={title}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-gray-600 text-sm truncate">{channelTitle}</p>
                <div className="flex justify-between text-gray-500 text-sm mt-2">
                  <span>👁 {viewCount || "N/A"} views</span>
                  <span>👍 {likeCount || "N/A"} likes</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BodyvideosList;
