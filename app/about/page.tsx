"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About MediBook</h1>

      <p className="text-gray-700 text-lg mb-6">
        <strong>MediBook</strong> is an intelligent appointment scheduling
        system designed to make healthcare access easier and more organized for
        both patients and doctors.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🩺 How It Works
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Patients register and book appointments with doctors of their
              choice.
            </li>
            <li>
              Doctors manage their schedules and mark availability (e.g.,{" "}
              <em>Available Today</em>, <em>Fully Booked</em>, <em>On Leave</em>
              ).
            </li>
            <li>
              Each appointment includes patient, doctor, and time data, and is
              stored securely in the system.
            </li>
            <li>
              Status tracking helps users see whether an appointment is{" "}
              <strong>scheduled</strong>, <strong>completed</strong>, or{" "}
              <strong>cancelled</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            👥 Patient Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Simple appointment booking with real-time availability.</li>
            <li>Email confirmation and appointment tracking.</li>
            <li>View your upcoming and past appointments.</li>
            <li>Cancel or reschedule if needed.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            👨‍⚕️ Doctor Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Manage your availability with clear status updates.</li>
            <li>View and manage your daily appointment list.</li>
            <li>Track completed or cancelled appointments.</li>
            <li>
              Build a trusted relationship with patients through reliable
              scheduling.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🔐 Data Integrity & Management
          </h2>
          <p className="text-gray-700">
            All appointment records are securely stored in a MySQL database. The
            system supports role-based access to ensure doctors and patients can
            only access data relevant to them.
          </p>
        </section>
      </div>
    </div>
  );
}
