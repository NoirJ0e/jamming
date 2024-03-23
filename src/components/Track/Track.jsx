import React from "react";

function Track({ track, isRemoval, operateMethod }) {
  const { name, artist, album } = track;
  const handleClick = () => {
    operateMethod(track);
  };

  function OperateButton() {
    return (
      <button className="track-action text-3xl text-white hover:animate-pulse" onClick={handleClick}>
        {isRemoval ? "-" : "+"}
      </button>
    );
  }
  return (
    <div className="hover:bg-gradient-to-r from-purple-500 to-pink-500 rounded-md bg-transparent backdrop-blur-sm mt-4 mb-4 shadow-md flex justify-between text-slate-50 border-blue shadow-slate-400 p-2 min-w-80 max-w-96">
      <div className="flex flex-col justify-between">
        <h3><strong>{name}</strong></h3>
        <p className="text-sm">
          {artist} <br />{album}
        </p>
      </div>
      <OperateButton />
    </div>
  );
}

export default Track;
