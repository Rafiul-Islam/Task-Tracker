import {create} from "zustand";
import LoggedInUser from "../types/LoggedInUser.ts";

interface AuthStore {
  currentUser: LoggedInUser;
  setCurrentUser: (user: LoggedInUser) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  currentUser: {} as LoggedInUser,
  setCurrentUser: (user: LoggedInUser) => set(() => {
    return {
      currentUser: {
        userId: user.userId,
        name: user.name,
        email: user.email
      }
    };
  }),
}));

export default useAuthStore;
