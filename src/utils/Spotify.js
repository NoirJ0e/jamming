const Spotify = {
  CLIENT_ID: "cac314529e874fc284435f8091b01085",
  REDIRECT_URL: "http://localhost:3000/callback",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  RESPONSE_TYPE: "token",

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
    const url = `${Spotify.AUTH_ENDPOINT}?response_type=${Spotify.RESPONSE_TYPE}&client_id=${Spotify.CLIENT_ID}&redirect_uri=${Spotify.REDIRECT_URL}&state=${state}`;
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
};

export default Spotify;
