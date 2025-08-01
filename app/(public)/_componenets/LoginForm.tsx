"use client";

import { Eye, EyeOff, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/Store/authUser";
import { toast } from "sonner";

export default function LoginForm() {
  // Form state management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Authentication state and actions
  const { signup } = useAuthStore();
  const { users, isSigningUp } = useAuthStore();

  // Password visibility toggles
  const [showPasswod, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /**
   * Handles form submission with validation
   * @param e - Form submission event
   */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous error
    setPasswordError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    // Check if password meets minimum length requirement
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    //Check email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Check if role is selected
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    // Check for existing email
    if (users.find((user) => user.email === email)) {
      toast.success("User already exists");
      return;
    }

    // Check for existing username
    if (users.find((user) => user.username === username)) {
      toast.error("User already exists");
      return;
    }

    try {
      // Attempt to sign up the user
      signup({
        username,
        email,
        password,
        role,
      });

      // Reset form on successful submission
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
    } catch {
      // Handle signup failure
      toast.error("Signup failed");
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-xl text-center font-semibold leading-none tracking-tight">
            Welcome to Upreps{" "}
          </h3>
          <div className="relative mt-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Sign with your email
            </span>
          </div>
        </div>
        <div className="p-6 pt-0 flex flex-col gap-2">
          <div className="grid gap-3">
            <div className="grid gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium leading-none"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className=" h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
              />
            </div>{" "}
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
              />
            </div>{" "}
            <div className="grid gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none "
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPasswod ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPasswod)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswod ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPasswod)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              ></button>
            </div>{" "}
            <div className="grid gap-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium leading-none"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            <div className="grid gap-2 ">
              <label
                htmlFor="role"
                className="text-sm font-medium leading-none"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className=" h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 "
              >
                <option value="" disabled className="text-muted-foreground">
                  Select a role
                </option>
                <option value="admin" className="w-full">
                  Admin
                </option>
                <option value="user" className="w-full">
                  User
                </option>
              </select>
            </div>
            <button
              className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
