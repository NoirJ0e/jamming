import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.js";
import Playlist from "./components/Playlist/Playlist.js";
import NavBar from "./components/NavBar/NavBar.js";
import SearchResults from "./components/SearchResults/SearchResults.js";
import Spotify from "./utils/Spotify.js";

const exampleSearchResults = [
  {
    id: 1,
    name: "Track 1",
    artist: "Artist 1",
    album: "Album 1",
    uri: "spotify:track:5LRnfm4nmmfBEGgkrKrSQv",
  },
  {
    id: 2,
    name: "Track 2",
    artist: "Artist 2",
    album: "Album 2",
    uri: "spotify:track:5LRnfm4nmmfBEGgkrKrKKv",
  },
  {
    id: 3,
    name: "Track 3",
    artist: "Artist 3",
    album: "Album 3",
    uri: "spotify:track:5LRnfm4nmmfBEGgkrKriIv",
  },
  {
    id: 4,
    name: "Track 4",
    artist: "Artist 4",
    album: "Album 4",
    uri: "spotify:track:5Liifm4nmmfBEGgkrKrSQv",
  },
  {
    id: 5,
    name: "Track 5",
    artist: "Artist 5",
    album: "Album 5",
    uri: "spotify:track:5LRnapanmmfBEGgkrKrSQv",
  },
  {
    id: 6,
    name: "Track 6",
    artist: "Artist 6",
    album: "Album 6",
    uri: "spotify:track:5LRnfmooomfBEGgkrKrSQv",
  },
];
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

  // create a playlist
  useEffect(() => {
    console.log(
      `useEffect: \naccessToken: ${accessToken}\nuserId: ${userId}\nplaylistName: ${playlistName}\nplaylistTracks length: ${playlistTracks.length}`
    );
    if (userId && playlistName && playlistTracks.length > 0) {
      console.log("useEffect: create a playlist");
      console.log("Creating a playlist...");
      console.log("User ID:", userId);
      console.log("Playlist Name:", playlistName);
      console.log("Tracks:", playlistTracks);
    }
  }, [playlistTracks.length, playlistName]);

  const handleSearch = async (keyword) => {
    const searchResults = await Spotify.search(keyword, accessToken);

    console.log(JSON.stringify(searchResults));

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

  if (loggedIn) {
    return (
      <div>
        <NavBar />
        <SearchBar onSearch={handleSearch} />
        <SearchResults
          results={searchResults}
          operateMethod={playListAddTrack}
        />
        <Playlist
          playlistName={playlistName}
          savedTracks={playlistTracks}
          onNameChange={handlePlayListNameChange}
          onSave={playListSave}
          operateMethod={playListRemoveTrack}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Please login to use</h2>
        <button onClick={Spotify.redirectToSpotifyAuthorization}>Login</button>
      </div>
    );
  }
}

export default App;
