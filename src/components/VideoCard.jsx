import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import videoContext from "../utils/videoContext";

const VideoCard = ({ video }) => {
  const { setSelectedVideo } = useContext(videoContext);
  const navigate = useNavigate();

  const { channelTitle, description, title, thumbnails } = video?.snippet || {};
  const { viewCount, likeCount } = video?.statistics || {};

  const handleClick = () => {
    setSelectedVideo({
      viewCount,
      likeCount,
      title,
      channelTitle,
      description,
    });
    console.log(video);
    let videoNavId = video.id;
    if (typeof video.id !== "string") {
      videoNavId = video.id?.videoId || "";
    }

    navigate(`/watch?v=${videoNavId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
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
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
