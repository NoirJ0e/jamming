import React from "react";
import Tracklist from "../Tracklist/Tracklist";

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
        defaultValue="New Playlist"
        onChange={handleNameChange}
        type="text"
      />

      <Tracklist
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
