
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const { login, loading, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await login({ email, password });
      console.log(result)
      if (result?.error) {
        setError(result.error);
        return;
      }
      result?.user?.role === "owner" ? router.push("/myProperties") :
      router.push("/properties");
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Invalid credentials or server error. Please try again.");
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
          <button type="button" className="w-full bg-gray-300 text-gray-700 p-2 rounded mt-4 hover:bg-gray-400">
            <a href="/signup">Signup</a></button>
        </form>
      </div>
    </div>
  );
}