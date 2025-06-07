import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningIn: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.User });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: response.data.user });
      toast.success("Signed up successfully");
    } catch (error) {
      console.log("error while signing up", error);
      toast.error("Error while signing up");
    } finally {
      set({ isSigningIn: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("error while logging in", error);
      toast.error("Error while logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("error while logging out", error);
      toast.error("Error while logging out");
    }
  },
}));
