import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import PlayList from "./components/Playlist";
import NavBar from "./components/NavBar";
import SearchResults from "./components/SearchResults";

const exampleSearchResults = [
  { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" },
  { id: 2, name: "Track 2", artist: "Artist 2", album: "Album 2" },
  { id: 3, name: "Track 3", artist: "Artist 3", album: "Album 3" },
  { id: 4, name: "Track 4", artist: "Artist 4", album: "Album 4" },
  { id: 5, name: "Track 5", artist: "Artist 5", album: "Album 5" },
  { id: 6, name: "Track 6", artist: "Artist 6", album: "Album 6" },
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
  const playListSave = () => {
    console.log("Saving the playlist to Spotify...");
    console.log("Playlist Name:", playlistName);
    console.log("Tracks:", playlistTracks);
    // Here, you will later add the code to interact with the Spotify API
  };

  return (
    <div>
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
      <PlayList
        playlistName={playlistName}
        savedTracks={playlistTracks}
        onRemove={playListRemoveTrack}
        onNameChange={handlePlayListNameChange}
        onSave={playListSave}
      />
    </div>
  );
}

export default App;
