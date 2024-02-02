import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Playlist from "./components/Playlist/Playlist.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import BeforeLogin from "./components/BeforeLogin/BeforeLogin.jsx";
import AfterLogin from "./components/AfterLogin/AfterLogin.jsx";
import Spotify from "./utils/Spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [playListId, setPlayListId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedTrackURIs, setSavedTrackURIs] = useState([]);

  // Sign in for the access token and user id
  useEffect(() => {
    const token = Spotify.getAccessToken();
    if (token) {
      setAccessToken(token);
      // Store the user id to create a playlist later
      setUserId(async () => {
        try {
          const userId = await Spotify.getUserId(token);
          setUserId(userId);
          setLoggedIn(true);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, []);

  const handleSearch = async (keyword) => {
    const searchResults = await Spotify.search(keyword, accessToken);

    const results = searchResults.filter(
      (track) =>
        track.name.toLowerCase().includes(keyword.toLowerCase()) ||
        track.artist.toLowerCase().includes(keyword.toLowerCase()) ||
        track.album.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
  };

  const handlePlayListNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const playListRemoveTrack = (track) => {
    const newTracks = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(newTracks);
  };

  const playListAddTrack = (track) => {
    const newTracks = [...playlistTracks, track];
    setPlaylistTracks(newTracks);
    const newTrackURIs = [...savedTrackURIs, track.uri];
    setSavedTrackURIs(newTrackURIs);
  };

  const playListSave = async () => {
    try {
      // First, create the playlist and get the playlist ID
      const newPlayListId = await Spotify.createPlayList(
        userId,
        accessToken,
        playlistName
      );

      // Then, set the playlist ID in your state
      setPlayListId(newPlayListId);

      // Finally, add tracks to the playlist
      // Make sure to check if newPlayListId is not null or undefined
      if (newPlayListId) {
        await Spotify.addToPlayList(
          newPlayListId,
          accessToken,
          playlistTracks.map((track) => track.uri)
        );
      }
    } catch (error) {
      console.error("Error in saving playlist:", error);
    }
  };

  return (
    <div>
      <NavBar />
      {loggedIn ? (
        <AfterLogin
          handleSearch={handleSearch}
          searchResults={searchResults}
          playListAddTrack={playListAddTrack}
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          handlePlayListNameChange={handlePlayListNameChange}
          playListSave={playListSave}
          playListRemoveTrack={playListRemoveTrack}
        />
      ) : (
        <BeforeLogin />
      )}
    </div>
  );
}

export default App;
