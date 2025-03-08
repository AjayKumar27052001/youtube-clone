import { createContext, useContext } from "react";

const searchContext = createContext();
export const useSearch = () => {
  return useContext(searchContext);
};
export default searchContext;
