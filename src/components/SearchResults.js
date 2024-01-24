import React from "react";
import Tracklist from "./Tracklist";

function SearchResults({ results }) {
  return (
    <section className="search-results">
      <Tracklist tracks={results} />
    </section>
  );
}

export default SearchResults;
