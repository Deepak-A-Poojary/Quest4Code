import express from "express";
import {
  getAllPlaylists,
  getPlaylistDetails,
  createPlaylist,
  addProblemToPlaylist,
  deletePlaylist,
  removeProblemFromPlaylist
} from "../controllers/playlist.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const playlistRoutes = express.Router();

playlistRoutes.post("/create-playlist", authMiddleware, createPlaylist);
playlistRoutes.get("/", authMiddleware, getAllPlaylists);
playlistRoutes.get("/:playlistId", authMiddleware, getPlaylistDetails);
playlistRoutes.post("/:playlistId/add-problem",authMiddleware,addProblemToPlaylist);

playlistRoutes.delete("/delete-playlist/:id", authMiddleware, deletePlaylist);

playlistRoutes.delete("/:playlistId/remove-problem", authMiddleware, removeProblemFromPlaylist);
export default playlistRoutes;
