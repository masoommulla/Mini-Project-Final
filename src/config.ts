console.log("🌍 Loading API URL...");

export const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mini-project-final-fxeg.onrender.com/api";

console.log("🚀 API_URL Loaded:", API_URL);

export default {
  apiUrl: API_URL,
};
