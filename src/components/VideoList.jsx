import VideoCard from "./VideoCard";

const VideoList = ({ videoData }) => {
  if (!videoData || videoData.length === 0) {
    return <div>No videos found</div>;
  }

  return (
    <div className="p-4 pt-25 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videoData.map((item) => (
        <VideoCard key={item.id} video={item} />
      ))}
    </div>
  );
};

export default VideoList;
