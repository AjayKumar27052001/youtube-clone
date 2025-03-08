import { useEffect, useState } from "react";
import { api_Url } from "../utils/constants";
import useFetch from "../utils/useFetch";
import { useNavigate } from "react-router-dom";
import videoContext from "../utils/videoContext";
import { useContext } from "react";

import { useSearch } from "../contexts/searchContext";
import VideoList from "./VideoList";

//state variables declaration

const BodyvideosList = () => {
  const { videodata, setVideoData } = useSearch();
  //const [videodata,setVideo]

  //API fetching Data
  const { data, loading, errorData } = useFetch(api_Url);
  useEffect(() => {
    if (data?.items) setVideoData(data.items); //here i should put "data?" because intially data=[]
  }, [data]);
  if (loading) return <div>Loading...</div>;
  if (errorData) return <div>Error: {errorData.message}</div>;
  //styling Data---we can reuse
  return (
    <div className="p-4">
      <VideoList videoData={videodata} />
    </div>
  );
};

export default BodyvideosList;
