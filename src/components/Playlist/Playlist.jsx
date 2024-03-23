import React from "react";
import TrackList from "../TrackList/TrackList.jsx";

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
    <section className="playlist m-11 bg-transparent min-w-60 max-w-96">
      <div className="flex flex-col ">
        <input
          value={playlistName}
          placeholder="New Playlist"
          onChange={handleNameChange}
          type="text"
          className="rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
        />

        <TrackList
          tracks={savedTracks}
          isRemoval={true}
          operateMethod={operateMethod}
        />

        <button
          className="mt-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-2"
          onClick={onSave}>
          SAVE TO SPOTIFY
        </button>

      </div>
    </section>
  );
}

export default Playlist;
