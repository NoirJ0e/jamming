import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";

function AfterLogin({
  handleSearch,
  searchResults,
  playListAddTrack,
  playlistName,
  playlistTracks,
  handlePlayListNameChange,
  playListSave,
  playListRemoveTrack,
}) {
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} operateMethod={playListAddTrack} />
      <Playlist
        playlistName={playlistName}
        savedTracks={playlistTracks}
        onNameChange={handlePlayListNameChange}
        onSave={playListSave}
        operateMethod={playListRemoveTrack}
      />
    </div>
  );
}

export default AfterLogin;
