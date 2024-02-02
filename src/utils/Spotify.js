// use to create track object that only contains information we need
class Track {
  constructor(id, name, artist, album, uri) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.uri = uri;
  }
  toString() {
    return `id: ${this.id}, name: ${this.name}, artist: ${this.artist}, album: ${this.album}, uri: ${this.uri}`;
  }
}
const Spotify = {
  CLIENT_ID: "cac314529e874fc284435f8091b01085",
  REDIRECT_URL: "http://localhost:3000/callback",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  RESPONSE_TYPE: "token",
  SCOPE: "playlist-modify-private playlist-modify-public",

  generateRandomString: (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },

  redirectToSpotifyAuthorization: () => {
    const state = Spotify.generateRandomString(16);
    const url = `${Spotify.AUTH_ENDPOINT}?response_type=${
      Spotify.RESPONSE_TYPE
    }&client_id=${Spotify.CLIENT_ID}&redirect_uri=${
      Spotify.REDIRECT_URL
    }&state=${state}&scope=${encodeURI(Spotify.SCOPE)}`;
    window.location = url;
  },

  getAccessToken: () => {
    const hash = window.location.hash;
    let token = hash
      .substring(1)
      .split("&")
      .find((item) => item.startsWith("access_token="));
    if (token) {
      token = token.split("=")[1];
      localStorage.setItem("accessToken", token);
      // clear token from url
      window.location.hash = "";
      return token;
    }
    return null;
  },
  getUserId: async (accessToken) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse.id;
  },
  createPlayList: async (userId, accessToken, playlistName) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "Created from Jammming",
            public: false,
          }),
        }
      );
      const jsonResponse = await response.json();
      return jsonResponse.id;
    } catch (e) {
      console.log(e);
    }
  },
  search: async (keyword, accessToken) => {
    try {
      const results = [];
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          keyword
        )}&type=track`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // array of Spotify Track objects which contains more information than we need
      const jsonResponse = await response.json();
      const items = jsonResponse.tracks.items;
      // filter the information we need
      return items.map((item) => ({
        id: item.id,
        name: item.name,
        album: item.album.name,
        artist: item.artists[0].name,
        uri: item.uri,
      }));
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  addToPlayList: async (playListId, accessToken, arrayOfTracks) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: arrayOfTracks,
          }),
        }
      );
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (e) {
      console.log(e);
    }
  },
};

export default Spotify;
