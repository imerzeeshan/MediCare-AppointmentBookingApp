"use client";

import { useState } from "react";

export default function BookAppointment({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.date && form.phone) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold">Appointment Booked!</h1>
        <p className="mt-2">
          Thank you, {form.name}. A confirmation has been sent to {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        name="phone"
        type="number"
        placeholder="Your Mobile number"
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        name="date"
        type="date"
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
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
