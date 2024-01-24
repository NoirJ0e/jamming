import React from "react";

function Track({ track, isRemoval, operateMethod }) {
  const { name, artist, album } = track;
  const handleClick = () => {
    operateMethod(track);
  };

  function OperateButton() {
    return (
      <button className="track-action" onClick={handleClick}>
        {isRemoval ? "-" : "+"}
      </button>
    );
  }
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
