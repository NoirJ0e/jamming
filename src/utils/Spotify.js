const CLIENT_ID = "cac314529e874fc284435f8091b01085";
const REDIRECT_URL = "http://localhost:8888/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const STATE_KEY = "spotify_auth_state";

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function redirectToSpotifyAuthorization() {
  const state = generateRandomString(16);
  localStorage.setItem(STATE_KEY, state); // WHY??
  const url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URL}&state=${state}&scope=playlist-modify-public`;
  window.location = url;
}
