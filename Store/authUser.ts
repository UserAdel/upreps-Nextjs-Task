// Import toast notifications from sonner for user feedback
import { toast } from "sonner";
// Import Zustand's create function for state management
import { create } from "zustand";

/**
 * User interface defining the structure of a user object
 * @interface User
 * @property {string} username - The user's display name
 * @property {string} email - The user's email address (used as unique identifier)
 * @property {string} password - The user's password
 * @property {string} role - The user's role (e.g., 'user', 'admin')
 */
type User = {
  username: string;
  email: string;
  password: string;
  role: string;
};

/**
 * Authentication store interface defining the structure and methods for user management
 * @interface AuthStore
 * @property {User[]} users - Array of all registered users
 * @property {boolean} isSigningUp - Loading state for signup process
 * @property {boolean} isEditingUser - Loading state for user editing process
 * @property {Function} signup - Method to register a new user
 * @property {Function} editUser - Method to update an existing user's information
 * @property {Function} deleteUser - Method to remove a user from the system
 * @property {Function} clearUsers - Method to remove all users from the system
 */
type AuthStore = {
  users: User[];
  isSigningUp: boolean;
  isEditingUser: boolean;
  signup: (credentials: User) => Promise<void>;
  editUser: (email: string, credentials: User) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  clearUsers: () => void;
};

/**
 * Zustand store for authentication and user management
 * Provides centralized state management for user-related operations
 */
export const useAuthStore = create<AuthStore>((set, get) => ({
  // Array of all registered users with mock data for development
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

  // Loading states for UI feedback
  isSigningUp: false,
  isEditingUser: false,
  /**
   * Creates a new user account and adds it to the users array
   * @param {User} credentials - The user data for the new account
   * @returns {Promise<void>}
   */
  signup: async (credentials: User): Promise<void> => {
    // Set loading state to true
    set({ isSigningUp: true });
    try {
      // Get current users array
      const { users } = get();
      // Add new user to the array
      const updatedUsers = [...users, credentials];
      // Update state with new users array and reset loading state
      set({ users: updatedUsers, isSigningUp: false });
      // Show success notification
      toast.success("Account created successfully");
    } catch (error) {
      // Handle signup failure
      toast.error("Signup failed");
      set({ isSigningUp: false });
    }
  },
  /**
   * Updates an existing user's information
   * @param {string} email - The email of the user to update (used as identifier)
   * @param {User} credentials - The updated user data
   * @returns {Promise<void>}
   */
  editUser: async (email: string, credentials: User): Promise<void> => {
    // Set loading state to true
    set({ isEditingUser: true });
    // Get current users array
    const { users } = get();
    // Map through users and update the one with matching email
    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        // Merge existing user data with new credentials
        return { ...user, ...credentials };
      }
      return user;
    });
    // Update state with modified users array and reset loading state
    set({ users: updatedUsers, isEditingUser: false });
    // Show success notification
    toast.success("User updated successfully");
  },
  /**
   * Removes a user from the system
   * @param {string} email - The email of the user to delete
   * @returns {Promise<void>}
   */
  deleteUser: async (email: string): Promise<void> => {
    // Get current users array
    const { users } = get();
    // Filter out the user with the specified email
    const updatedUsers = users.filter((user) => user.email !== email);
    // Update state with filtered users array
    set({ users: updatedUsers });
    // Show success notification
    toast.success("User deleted successfully");
  },
  /**
   * Removes all users from the system (clears the users array)
   * @returns {void}
   */
  clearUsers: (): void => {
    // Set users array to empty
    set({ users: [] });
    // Show success notification
    toast.success("All users cleared");
  },
}));
