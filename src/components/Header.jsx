import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";
import { searchSuggestionsApi } from "../utils/constants";
import { useSearch } from "../contexts/searchContext";
import { api_Url } from "../utils/constants";
import { searchVideoApi } from "../utils/constants";

const Header = () => {
  const menu_Image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdqgxY6HhT6trjf7ASBTrRnLnNLXnlT8WYw&s";

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { videodata, setVideoData } = useSearch();

  //note:here we shouldnt use custom useFetch hook,becuase here it doent need to update bodyvideoslist everytime,we just need only clicking button

  const searchHandler = async () => {
    const api = !searchValue
      ? api_Url
      : `${searchVideoApi}&q=${encodeURIComponent(searchValue)}`;

    try {
      const response = await fetch(api);
      console.log(api);
      if (!response.ok) throw new Error("Error fetching videos");

      const res = await response.json();
      if (res.items) {
        setVideoData(res.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchSuggestionHandler = async (searchValue) => {
    // console.log("searchValue is " + searchValue);
    const res = await fetch(searchSuggestionsApi + searchValue);
    const data = await res.json();

    setSearchSuggestions(data[1]);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      searchSuggestionHandler(searchValue);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  return (
    <div className="flex fixed items-center justify-between py-4 px-4 bg-white   w-full z-10 mb-2 mx-2">
      {" "}
      {/*i removed fixed property,so my videos getdown*/}
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <img className="w-10 h-10 cursor-pointer" src={menu_Image} alt="Menu" />
        <div className="flex items-center space-x-1">
          <Link to="/">
            <img
              className="w-10 h-10 "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnQbLJZ3rJAv_wLXuHFJKxTO1GKMS0zhf8Q&s"
              alt="youtubelogo"
            />
          </Link>

          <div className="text-3xl  font-bold  text-red-600 cursor-pointer"></div>
        </div>
      </div>
      {/* Search Section */}
      <div className="realtive flex-row w-4/5">
        <div className="flex flex-1 items-center  bg-gray-100 rounded-full w-4/5 max-w-4xl p-2">
          <input
            className="w-full flex-1 h-10 pl-4 py-4 pr-0 rounded-full border-2 border-gray-300 focus:outline-none rounded-r-none"
            placeholder="Search"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!e.target.value) searchHandler();
            }} //e needs to take in fn parameter
          />
          <button
            className=" text-white text-center h-10  px-4 rounded-l-none rounded-full hover:bg-gray-200 focus:outline-none border-2 border-gray-300"
            onClick={searchHandler}
          >
            <span className="text-white text-xl">🔍</span>
          </button>
        </div>
        <div className="absolute w-4/5 border-black rounded-2xl bg-white font-bold flex-row space-y-0.5">
          {showSuggestions &&
            searchSuggestions.map((item, index) => (
              <div className="px-3 py-1 text-black" key={index}>
                🔍 {item}
              </div>
            ))}
        </div>
      </div>
      {/* Right Section (Profile Image & Notification) */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
            alt="profileimage"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
