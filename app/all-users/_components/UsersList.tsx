"use client";

/**
 * UsersList Component
 *
 * Displays a list of users with search, edit, and delete functionality.
 * Integrates with the auth store for managing user data.
 */

import { useAuthStore } from "@/Store/authUser";
import { Edit, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function UserList() {
  // Access user data and actions from the auth store
  const { users, deleteUser, clearUsers } = useAuthStore();

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Filter users based on search term
   * Memoized to prevent unnecessary recalculations
   * @returns {Array} Filtered list of users matching the search criteria
   */
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;

    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href="/">
            <button className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Back to Login
            </button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            All Users ({users.length})
          </h1>
        </div>
        {users.length > 0 && (
          <button
            onClick={clearUsers}
            className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-orange-600 text-orange-600 hover:bg-orange-50 h-10 px-4 py-2"
          >
            Clear All Users
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
          <input
            type="text"
            placeholder="Search users by username, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 sm:text-base"
          />
        </div>
        {searchTerm && (
          <div className="mt-2 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>
      {users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-base sm:text-lg">
            No users found. Try signing up a user first.
          </p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-base sm:text-lg">
            No users found matching {searchTerm}
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-2 w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((user, index) => (
            <div
              key={user.email}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg shadow-sm gap-3 sm:gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium text-sm sm:text-base">
                    {index + 1}. {user.username}
                  </span>
                  <span className="text-gray-600 text-xs sm:text-sm">
                    ({user.email})
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs w-fit">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  href={`/edit-user?email=${encodeURIComponent(user.email)}`}
                  className="flex-1 sm:flex-none"
                >
                  <button className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    <Edit className="size-3 sm:size-4 mr-1" />
                    <span className="inline">Edit</span>
                  </button>
                </Link>
                <button
                  onClick={() => {
                    deleteUser(user.email);
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3"
                >
                  <Trash2 className="size-3 sm:size-4 mr-1" />
                  <span className="inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
