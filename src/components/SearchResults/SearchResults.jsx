import React from "react";
import TrackList from "../TrackList/TrackList";

function SearchResults({ results, operateMethod }) {
  return (
    <section className="search-results min-w-30">
      <TrackList
        tracks={results}
        isRemoval={false}
        operateMethod={operateMethod}
      />
    </section>
  );
}

export default SearchResults;
