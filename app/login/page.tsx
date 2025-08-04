"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookie, setAuthCookie } from "@/lib/cookies";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setAuthCookie(data.token);
      //   localStorage.setItem("token", data.token);
      router.push("/"); // redirect after login
    } else {
      setError(data.error || "Login failed.");
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const isAuthenticated = await fetch("/api/protected", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(isAuthenticated);
      if (isAuthenticated.ok) {
        router.push("/");
      }
    };
    checkToken();
  }, [router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
      <div className="mt-2">
        <p>
          Don't have an account?{" "}
          <button
            className="relative text-blue-600 transition-all duration-300 ease-in-out after:content-[''] after:absolute 
            after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-blue-600 
            after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
}
