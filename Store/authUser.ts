import { toast } from "sonner";
import { create } from "zustand";

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  users: User[];
  isSigningUp: boolean;
  isEditingUser: boolean;
  signup: (credentials: User) => Promise<void>;
  editUser: (email: string, credentials: User) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  clearUsers: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  users: [
    {
      username: "Adel(mockDate)",
      email: "adel@mockDate.com",
      password: "mockDate",
      role: "user",
    },
    {
      username: "Hany(mockDate)",
      email: "hany@mockDate.com",
      password: "mockDate",
      role: "admin",
    },
  ],
  isSigningUp: false,
  isEditingUser: false,
  signup: async (credentials: User) => {
    set({ isSigningUp: true });
    try {
      const { users } = get();
      const updatedUsers = [...users, credentials];
      set({ users: updatedUsers, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },
  editUser: async (email: string, credentials: User) => {
    set({ isEditingUser: true });
    const { users } = get();
    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        return { ...user, ...credentials };
      }
      return user;
    });
    set({ users: updatedUsers, isEditingUser: false });
    toast.success("User updated successfully");
  },
  deleteUser: async (email: string) => {
    const { users } = get();
    const updatedUsers = users.filter((user) => user.email !== email);
    set({ users: updatedUsers });
    toast.success("User deleted successfully");
  },
  clearUsers: () => {
    set({ users: [] });
    toast.success("All users cleared");
  },
}));
