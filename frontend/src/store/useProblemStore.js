import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,

  sovledProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async () => {
    set({ isProblemsLoading: true });
    try {
      const res = await axiosInstance.get("/problems/get-all-problems");
      set({ problems: res.data.problems });
    } catch (error) {
      console.log("error while getting all problems", error);
      toast.error(res.data.message || "Error while getting all problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (problemId) => {
    set({ isProblemLoading: true });
    try {
      const res = await axiosInstance.get(`/problems/get-problem/${problemId}`);
      set({ problem: res.data.problem });
    } catch (error) {
      console.log("error while getting problem", error);
      toast.error(error || "Error while getting problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblems: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problem");
      set({ sovledProblems: res.data.problems });
    } catch (error) {
      console.log("error while getting solved problems", error);
      toast.error(res.data.message || "Error while getting solved problems");
    }
  },
}));
