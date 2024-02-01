import React from "react";
import TrackList from "../TrackList/TrackList.js";

function Playlist({
  playlistName,
  savedTracks,
  onNameChange,
  onSave,
  operateMethod,
}) {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };
  return (
    <section className="playlist">
      <input
        value={playlistName}
        placeholder="New Playlist"
        onChange={handleNameChange}
        type="text"
      />

      <TrackList
        tracks={savedTracks}
        isRemoval={true}
        operateMethod={operateMethod}
      />

      <button className="playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </section>
  );
}

export default Playlist;
