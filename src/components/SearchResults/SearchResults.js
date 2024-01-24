import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ results, operateMethod }) {
  return (
    <section className="search-results">
      <Tracklist
        tracks={results}
        isRemoval={false}
        operateMethod={operateMethod}
      />
    </section>
  );
}

export default SearchResults;
