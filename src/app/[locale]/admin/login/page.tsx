"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="default" className="w-full max-w-md p-8 bg-white shadow-lg border border-gray-200">
          <h1 className="text-2xl font-playfair font-bold text-[#111827] mb-6 text-center">
            Admin Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] transition-colors"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#6B7280] hover:bg-[#4B5563]"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Login"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
