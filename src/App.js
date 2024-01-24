import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.js";
import Playlist from "./components/Playlist/Playlist.js";
import NavBar from "./components/NavBar/NavBar.js";
import SearchResults from "./components/SearchResults/SearchResults.js";

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
  const [searchResults, setSearchResults] = useState(exampleSearchResults);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleSearch = (keyword) => {
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
  };
  const playListSave = () => {
    console.log("Saving the playlist to Spotify...");
    console.log("Playlist Name:", playlistName);
    console.log("Tracks:", playlistTracks);
    // TODO: Add actual saving logic here
  };

  return (
    <div>
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} operateMethod={playListAddTrack} />
      <Playlist
        playlistName={playlistName}
        savedTracks={playlistTracks}
        onNameChange={handlePlayListNameChange}
        onSave={playListSave}
        operateMethod={playListRemoveTrack}
      />
    </div>
  );
}

export default App;
