import React from "react";
import Tracklist from "./Tracklist";
import Track from "./Track";

function Playlist({
  playlistName,
  savedTracks,
  onRemove,
  onNameChange,
  onSave,
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
        onRemove={onRemove}
        onSave={onSave}
        isRemoval={true}
      />
    </section>
  );
}

export default Playlist;
