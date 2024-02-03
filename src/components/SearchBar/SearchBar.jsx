import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={keyword}
        onChange={handleKeywordChange}
        type="text"
        className="text-center text-white bg-transparent border-b-4 border-purple-600 min-w-64"
      />
      <button
        onClick={handleSearch}
        className="mt-8 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
