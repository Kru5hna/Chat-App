import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    console.log("Running auth check...");

    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log("Authenticated user:", res.data);

      // Optionally connect socket or perform more actions:
      // get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error?.response?.data || error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
