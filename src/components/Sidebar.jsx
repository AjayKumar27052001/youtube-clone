import { useState } from "react";
import findNthPrime from "../utils/helper";

const Sidebar = () => {
  const [primeval, setPrimeVal] = useState("");
  const [theme, setTheme] = useState(true);
  const prime = (val) => {
    const primeValue = findNthPrime(val);
    console.log("primenumber is calculating" + primeValue);
    setPrimeVal(primeValue);
  };

  console.log("Rendering Sidebar"); // Check re-renders

  return (
    <div
      className={`pt-30 ${
        theme
          ? "text-blue-400 border-black font-bold text-7xl"
          : "text-black font-bold text-7xl border-white"
      }`}
    >
      <input
        placeholder="search"
        type="number"
        onChange={(e) => prime(e.target.value)} // React doesn't control the input
        className="border m-5"
      />
      <button
        className={` bg-amber-700 pt-10 mt-10 border-red-600
        `}
        onClick={() => setTheme(!theme)}
      >
        setTheme
      </button>
    </div>
  );
};

export default Sidebar;
