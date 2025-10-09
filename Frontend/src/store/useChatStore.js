import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useChatStore = create((set, get) => ({

   allConatacts : [],
   chats: [],
   activeTab: "chats",
   selectedUser: null,
   isUserLoading: false,
   isMessagesLoading: false,
   
   setActiveTab: (tab) => set({ activeTab: tab }),
   setSelectedUser: (selectedUser) => set({ selectedUser}),

   getAllContacts: async () => {
      set({ isUserLoading: true });
      try {
         const res = await axiosInstance.get('/messages/contacts');
         set({allConatacts: res.data});
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({isUserLoading: false})
      }
   },

   getMyChatPartners: async () => {
      set({ isUserLoading: true });
      try {
         const res = await axiosInstance.get('/messages/contacts');
         set({chats: res.data});
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         set({isUserLoading: false})
      }
   }
      
}))