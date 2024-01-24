import React from "react";
import Track from "./Track";

function Tracklist({ tracks, isRemoval, onSave, onRemove }) {
  return (
    <div className="track-list">
      {tracks.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            isRemoval={isRemoval}
            onSave={onSave}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

export default Tracklist;
