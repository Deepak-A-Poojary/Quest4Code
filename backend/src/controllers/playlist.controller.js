import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;

    const availablePlaylists = await db.playlist.findMany({
      where: {
        userId,
      },
    });

    console.log(availablePlaylists);

    let ifAlreadyAvailable = false;

    availablePlaylists.forEach((playlist) => {
      if (playlist.name === name) {
        ifAlreadyAvailable = true;
        return res.status(400).json({ error: "Playlist already exists" });
      }
    });

    if (!ifAlreadyAvailable) {
      const playlist = await db.playlist.create({
        data: {
          name,
          description,
          userId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Playlist created",
        playlist,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error While Creating Playlist" });
  }
};

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlists) {
      return res.status(404).json({ error: "Playlists not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Playlists",
      playlists,
    });
  } catch (error) {
    console.log("failed to fetch playlist", error);
    return res.status(500).json({ error: "Error While Fetching Playlists" });
  }
};

export const getPlaylistDetails = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist",
      playlist,
    });
  } catch (error) {
    console.log("failed to fetch playlist", error);
    return res.status(500).json({ error: "Error While Fetching Playlists" });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Problem id is incorrect or missing",
      });
    }

    // Fetch only valid problem IDs from DB
    const existingProblems = await db.problem.findMany({
      where: {
        id: { in: problemIds },
      },
      select: { id: true },
    });

    const existingProblemIds = existingProblems.map((p) => p.id);

    if (existingProblemIds.length === 0) {
      return res.status(400).json({
        error: "None of the problem IDs exist in the database.",
      });
    }

    //Check if ProblemID already exists in playlist
    const isProblemInPlaylist = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    // If problem already exists in playlist return status
    if (isProblemInPlaylist.length > 0) {
      return res.status(400).json({
        error: "Problem already exists in playlist",
      });
    }

    // Prepare only valid insertions
    const problemData = existingProblemIds.map((problemId) => ({
      playlistId,
      problemId,
    }));

    // Insert into DB
    const addProblemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemData,
    });

    // Return
    return res.status(201).json({
      success: true,
      message: "Problem added to playlist",
      problemData,
      problemInPlaylist,
    });
  } catch (error) {
    console.log("failed to add problem to playlist", error);
    return res.status(500).json({
      error: "Error While Adding Problem to Playlist",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const userId = req.user.id;

  console.log(userId);
  try {
    // ✅ Step 1: Check if playlist exists
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
    });

    // ✅ Step 2: check if playlist exists
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // ✅ Step 3: Delete the playlist
    const deletePlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    // ✅ Step 4: Return status code
    return res.status(200).json({
      success: true,
      message: "Playlist deleted",
      deletePlaylist,
    });
  } catch (error) {
    console.log("failed to delete playlist", error);
    return res.status(500).json({
      error: "Error While Deleting Playlist",
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const playlistId = req.params.playlistId;
  const { problemIds } = req.body;

  try {
    // Check if playlist exists
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // check if problem exists
    const problem = await db.problemInPlaylist.findMany({
      where: {
        id: { in: problemIds },
      },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    //Check if problem exits in playlist
    const isProblemInPlaylist = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    // If problem does not exist in playlist return status
    if (isProblemInPlaylist.length === 0) {
      return res.status(400).json({
        error: "Problem does not exist in playlist",
      });
    }

    // Delete the problem from the playlist
    const deleteProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    // Return status code
    return res.status(200).json({
      success: true,
      message: "Problem deleted from playlist",
      deleteProblem,
    });
  } catch (error) {
    console.log("failed to delete problem from playlist", error);
    return res.status(500).json({
      error: "Error While Deleting Problem from Playlist",
    });
  }
};
