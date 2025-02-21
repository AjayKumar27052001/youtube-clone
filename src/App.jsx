import React, { useState } from "react";
import Header from "./components/Header";
import BodyvideosList from "./components/BodyvideosList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Watch from "./components/Watch";
import videoContext from "./utils/videoContext";
import searchContext from "./contexts/searchContext";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [videodata, setVideoData] = useState([]);
  return (
    <div>
      <searchContext.Provider value={{ videodata, setVideoData }}>
        <videoContext.Provider value={{ selectedVideo, setSelectedVideo }}>
          <Header />
          <Outlet />
        </videoContext.Provider>
      </searchContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Body /> },
      {
        path: "/watch",
        element: <Watch />,
      },
      {
        path: "/test",
        element: <Sidebar />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default App;
