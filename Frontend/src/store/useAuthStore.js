import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    console.log("Running auth check...");

    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      console.log("Authenticated user:", res.data);

      // Optionally connect socket or perform more actions:
      // get().connectSocket();
    } catch (error) {
      console.log(
        "Error in checkAuth:",
        error?.response?.data || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success("Logged Out Successfully!");
      // socket
    } catch (error) {
      toast.error("Error Logging out");
      console.log('Logout error: ',error);
      
    }
  },
   updateProfile: async (data) => {
    try {
      
      const res = await axiosInstance.put("/auth/update-profile", data);
      
      
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("----->Error in update profile:", error);
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      
      toast.error(errorMessage);
    }
  },
}));
