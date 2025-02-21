import { createContext, useContext } from "react";

const searchContext = createContext({ videoData: [], setVideoData: () => {} });
export const useSearch = () => {
  return useContext(searchContext);
};
export default searchContext;
