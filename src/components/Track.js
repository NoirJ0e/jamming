import React from "react";

function Track({ track, isRemoval, onAdd, onRemove }) {
  const { name, artist, album } = track;
  const addTrack = () => {
    onAdd(track);
  };

  function OperateButton() {
    if (isRemoval) {
      return (
        <button className="track-action" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  }

  const removeTrack = () => {
    onRemove(track);
  };
  return (
    <div className="track">
      <h3>{name}</h3>
      <p>
        {artist} | {album}
      </p>
      <OperateButton />
    </div>
  );
}

export default Track;
