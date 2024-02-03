import React from "react";
import Spotify from "../../utils/Spotify";
import NavBar from "../NavBar/NavBar";

function BeforeLogin() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="justify-center text-5xl text-center text-slate-50 m-14">
        Please login to use
      </h2>
      <button
        onClick={Spotify.redirectToSpotifyAuthorization}
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Login
      </button>
    </div>
  );
}

export default BeforeLogin;
