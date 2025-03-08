import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [errorData, setError] = useState(null);

  useEffect(() => {
    if (url) fetchData(url);
  }, [url]); //its the best practise to give dependency as url

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      setloading(true);
      if (!res.ok) throw new Error("error in the fetching data");
      else {
        const resData = await res.json();
        setData(resData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setloading(false);
    }
  };
  return { data, errorData, loading };
};
export default useFetch;
