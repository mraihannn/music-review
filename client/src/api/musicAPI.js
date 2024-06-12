import axios from "axios";

const musicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default musicAPI;
