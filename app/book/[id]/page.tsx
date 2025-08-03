"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Patient } from "@/types"; // adjust import as needed

export default function BookAppointment() {
  const [date, setDate] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const doctorId = useParams().id;
  // console.log(doctorId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const getPetientData = async (id: number) => {
    const patRes = await fetch(`/api/patient/${id}`);
    const patData = await patRes.json();
    setPatient(patData[0]);
    // console.log(patData,"const");
  };

  const handleProtected = async () => {
    const authRes = await fetch("/api/protected");
    const { user } = await authRes.json();

    if (authRes.ok) {
      getPetientData(user.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date) {
      console.log(doctorId)
      const user = await fetch(`/api/appointment/${doctorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, doctorId, ...patient }),
      });
      const data = await user.json();
      console.log(data, "bookID");
      setSubmitted(true);
    }
  };

  useEffect(() => {
    handleProtected();
    // getPetientData();
  }, []);

  if (submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold">Appointment Booked!</h1>
        <p className="mt-2">Thank you. A confirmation has been sent to .</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      <label className="text-gray-500 mb-5" htmlFor="date">
        Appointment Date
      </label>
      <input
        name="date"
        type="date"
        onChange={handleChange}
        className="mb-4 mt-1 p-2 border rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Confirm Appointment
      </button>
    </form>
  );
}
