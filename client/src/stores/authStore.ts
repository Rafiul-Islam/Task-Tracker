import {create} from "zustand";
import LoggedInUser from "../types/LoggedInUser.ts";

interface AuthStore {
  user: LoggedInUser;
  setCurrentUser: (user: LoggedInUser) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {} as LoggedInUser,
  setCurrentUser: (currentUser: LoggedInUser) => set(() => ({user: currentUser})),
}));

export default useAuthStore;
