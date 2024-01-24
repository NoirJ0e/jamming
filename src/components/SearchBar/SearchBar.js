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
    <>
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={keyword}
        onChange={handleKeywordChange}
        type="text"
      />
      <button onClick={handleSearch}>SEARCH</button>
    </>
  );
}

export default SearchBar;
