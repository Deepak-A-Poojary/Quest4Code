import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://quest4code.onrender.com/api/v1"
      : "https://quest4code.onrender.com/api/v1",
  withCredentials: true,
});
