import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore"


export const useChatStore = create((set, get) => ({

  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
   
   setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

   getAllContacts: async () => {
      set({ isUserLoading: true });
      try {
         const res = await axiosInstance.get('/messages/contacts');
         set({ allContacts: res.data.users || [] });
      } catch (error) {
         toast.error(error.response?.data?.message || "Error loading contacts");
         set({ chats: [] });

      } finally {
         set({isUserLoading: false})
      }
   },

  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

      
  getMessagesByUserId: async(userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: Array.isArray(res.data) ? res.data : [] }) 
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async(messageData) => {
    const {selectedUser, messages} = get();
    // this is how you will access different store value 
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    }

    // Ui updates immediately by adding the message
    // set({ messages: messages.concat(optimisticMessage) })
    set({ messages: [...messages, optimisticMessage]})

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: messages
        .filter(msg => msg._id !== tempId)
        .concat(res.data) })
    } catch (error) {
      set({ messages: messages.filter(msg => msg._id !== tempId ) })
      toast.error(error.response?.data?.message || "Something Went Wrong");
    }
  }
}))