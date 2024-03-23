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
      <div className="flex justify-between">
        <SearchResults results={searchResults} operateMethod={playListAddTrack} />
        <div className="box-border">
          <Playlist
            playlistName={playlistName}
            savedTracks={playlistTracks}
            onNameChange={handlePlayListNameChange}
            onSave={playListSave}
            operateMethod={playListRemoveTrack}
          />
        </div>
      </div>
    </div>
  );
}

export default AfterLogin;
