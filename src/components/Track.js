import React from "react";

function Track({ name, artist, album }) {
  return (
    <div className="track">
      <h3>{name}</h3>
      <p>
        {artist} | {album}
      </p>
      <button className="track-action">+</button>{" "}
    </div>
  );
}

export default Track;
