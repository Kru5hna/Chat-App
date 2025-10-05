import { create } from "zustand";

export const useAuthStore = create((set) => ({
   authUser : { name: "John Doe", _id: "12345", age:25 },
   isLoggedIn : false,
   login: () => {
      console.log('We Just logged In');
      set({isLoggedIn: true});
   }
})) 