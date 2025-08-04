"use client";

import AppointmentCard from "@/components/AppointmentCard";
import { Appoint } from "@/types";

import { useEffect, useState } from "react";

export default function BookAppointment() {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(false);
  const [appointments, setAppointments] = useState<Appoint[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const { data } = await res.json();
    console.log(data);
    setAppointments(data);
  };

  const getAuthUser = async () => {
    const appoint = await fetch(`/api/protected`);
    const data = await appoint.json();

    if (data.message === "Authenticated") {
      setAuth(true);
      setEmail(data.user.email);
    } else {
      setAuth(false);
    }
    console.log(data.user);
  };

  const getLoggedInAppointments = async () => {
    const appRes = await fetch(`/api/appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const { data } = await appRes.json();
    setAppointments(data);
    console.log(data, "app");
  };

  useEffect(() => {
    getAuthUser();
    if (auth) {
      getLoggedInAppointments();
    }
  }, [auth]);

  return auth ? (
    <div className="max-w-[90%] mx-auto">
      <h1 className="my-8 text-2xl font-semibold text-gray-600 underline underline-offset-2">
        Appointment History
      </h1>
      <div className="flex flex-wrap gap-5">
        {appointments?.map((app) => (
          <AppointmentCard key={app.id} appoint={app} />
        ))}
      </div>
    </div>
  ) : (
    <>
      <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Search Your Appointments</h1>

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Search
        </button>
      </form>
      <div className="max-w-[90%] mx-auto">
        <h1 className="my-8 text-2xl font-semibold text-gray-600 underline underline-offset-2">
          Appointment History
        </h1>
        <div className="flex flex-wrap gap-5">
          {appointments?.map((app) => (
            <AppointmentCard key={app.id} appoint={app} />
          ))}
        </div>
      </div>
    </>
  );
}
