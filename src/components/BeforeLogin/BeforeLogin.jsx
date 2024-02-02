import React from "react";
import Spotify from "../../utils/Spotify";
import NavBar from "../NavBar/NavBar";

function BeforeLogin() {
  return (
    <div>
      <h2>Please login to use</h2>
      <button onClick={Spotify.redirectToSpotifyAuthorization}>Login</button>
    </div>
  );
}

export default BeforeLogin;
