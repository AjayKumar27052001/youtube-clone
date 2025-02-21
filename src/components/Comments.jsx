import { useEffect, useState } from "react";
import { commentsKey, youtube_Video_ApiKey } from "../utils/constants";
import useFetch from "../utils/useFetch";

const Comments = ({ videoId }) => {
  const commentsUrl = commentsKey + videoId + "&key=" + youtube_Video_ApiKey;
  const { data, loading, errorData } = useFetch(commentsUrl);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    if (data?.items) {
      setCommentsData(data.items);
    }
  }, [data]);

  if (errorData) return <div>Errordata</div>;
  if (loading) return <div>Loading.....</div>;
  let today = Date();

  /*return (
    <div className="flex-row">
      {commentsData.map((item) => {
        const {
          textOriginal,
          likeCount,
          authorDisplayName,
          authorProfileImageUrl,
          updatedAt,
        } = item?.snippet?.topLevelComment?.snippet || {};

        return (
          <div key={item.id}>
            <div className="flex-row">
              <div className="h-5 w-5">
                <img
                  className="object-cover"
                  src={authorProfileImageUrl}
                  alt="commentAuthorChannelImg"
                />
              </div>
              <div className="flex-row">
                <div>{authorDisplayName}</div>
                <div>{textOriginal}</div>
                <div>{likeCount}</div>
              </div>
            </div>

            <div></div>
          </div>
        );
      })}
    </div>
  );*/
  return (
    <div className="space-y-4">
      {commentsData.map((item) => {
        const {
          textOriginal,
          likeCount,
          authorDisplayName,
          authorProfileImageUrl,
          updatedAt,
        } = item?.snippet?.topLevelComment?.snippet || {};

        return (
          <div key={item.id} className="flex space-x-3">
            {/* Profile Image */}
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-full w-full rounded-full object-cover"
                src={authorProfileImageUrl}
                alt="Author"
              />
            </div>

            {/* Comment Content */}
            <div className="flex flex-col">
              {/* Author Name & Timestamp */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-800">
                  {authorDisplayName}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(updatedAt).toLocaleDateString()}
                </span>
              </div>

              {/* Comment Text */}
              <p className="text-sm text-gray-700 break-words">
                {textOriginal}
              </p>

              {/* Likes & Reply Section */}
              <div className="flex items-center space-x-3 text-gray-500 text-xs mt-1">
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  👍 <span>{likeCount}</span>
                </button>
                <button className="hover:text-blue-500">Reply</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
