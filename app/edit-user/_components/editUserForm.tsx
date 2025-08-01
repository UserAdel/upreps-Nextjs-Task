"use client";

/**
 * EditUserForm Component
 *
 * A form component for editing user information.
 * Handles user data editing with form validation and submission.
 * Integrates with the auth store for updating user data.
 */

import { useAuthStore } from "@/Store/authUser";
import { Eye, EyeOff, Loader2, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserForm() {
  // Router and URL parameters
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Access user data and actions from the auth store
  const { users, editUser, isEditingUser } = useAuthStore();

  // Form state management
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Effect to load user data when component mounts or email changes
   * Redirects to users list if user is not found
   */
  useEffect(() => {
    if (email) {
      const user = users.find((u) => u.email === email);
      if (user) {
        setUserData({
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
        });
      } else {
        router.push("/all-users");
      }
    }
  }, [email, users, router]);

  /**
   * Handles form submission
   * @param e - Form event
   */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email) {
      editUser(email, userData);
      router.push("/all-users");
    }
  };

  /**
   * Handles input changes and updates form state
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!email) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Error
            </h3>
            <p className="text-sm text-muted-foreground">
              No user email provided
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              onClick={() => router.push("/all-users")}
              className=" rounded-md text-sm font-medium  bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Edit User
          </h3>
          <p className="text-sm text-muted-foreground">
            Update user information
          </p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium leading-none "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
                className=" h-10 w-full rounded-md border bg-background pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-3"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className=" h-10 w-full rounded-md border bg-background pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-3"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium ">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Enter new password (leave empty to keep current)"
                  className=" h-10 w-full rounded-md border bg-background pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="role"
                className="text-sm font-medium leading-none "
              >
                Role
              </label>
              <select
                id="role"
                value={userData.role}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, role: e.target.value }))
                }
                className=" h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground "
              >
                <option value="" disabled className="text-muted-foreground">
                  Select a role
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 justify-center items-center inline-flex  rounded-md text-sm font-medium  bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                disabled={isEditingUser}
              >
                {isEditingUser ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Save className="size-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/all-users")}
                className="inline-flex  rounded-md text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
