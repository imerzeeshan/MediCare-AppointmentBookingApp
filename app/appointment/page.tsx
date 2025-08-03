"use client";

import AppointmentCard from "@/components/AppointmentCard";
import { Appoint, Doctor, Patient } from "@/types";

// const appointment: Appoint = {
//   id: 1,
//   user_id: 101,
//   doctor_id: 7,
//   email: "jane.doe@example.com",
//   status: "scheduled",
//   created_at: "2025-07-30T10:15:00Z",
//   appointment_date: "2025-08-02T14:00:00Z",
// };

// const doctor: Doctor = {
//   id: "7",
//   name: "Dr. John Smith",
//   specialization: "Cardiology",
//   image_url: "https://via.placeholder.com/150",
//   available: true,
// };

// const patient: Patient = {
//   id: "101",
//   name: "Jane Doe",
//   email: "jane.doe@example.com",
//   phone: "123-456-7890",
//   age: 32,
//   gender: "Female",
// };

// export default function Page() {
//   return (
//     <div className="p-6">
//       <AppointmentCard
//         appoint={appointment}
//         doctor={doctor}
//         patient={patient}
//       />
//     </div>
//   );
// }

import Link from "next/link";
import { useEffect, useState } from "react";

// type Appoint = {
//   user_id: number;
//   status: string;
//   id: number;
//   email: string;
//   doctor_id: number;
//   created_at: string;
//   appointment_date: string;
// };

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
    const { app } = await res.json();
    setAppointments(app);

    console.log(app);
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
    console.log(data);
  };

  const getLoggedInAppointments = async () => {
    const appRes = await fetch(`/api/appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const { app } = await appRes.json();
    setAppointments(app);
    // console.log(appData);
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
