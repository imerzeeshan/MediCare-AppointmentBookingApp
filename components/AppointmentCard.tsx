import React, { useEffect, useState } from "react";
import { Appoint, Doctor, Patient } from "@/types"; // adjust import as needed
import PatientDetails from "./PatientDetails";
import DoctorDetails from "./DoctorDetails";

// interface AppointmentCardProps {
//   appoint: Appoint;
//   doctor: Doctor;
//   patient: Patient;
// }

const AppointmentCard = ({ appoint }: { appoint: Appoint }) => {
  //   const [patient, setPatient] = useState<Patient | null>(null);
  //   const [doctor, setDoctor] = useState<Doctor | null>(null);

  //   const getPatientDetails = async () => {
  //     const patientRes = await fetch("/api/doctor/" + appoint.user_id, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const patientData = await patientRes.json();
  //     setPatient(petida);
  //     console.log(patientData);
  //   };

  //   useEffect(() => {
  //     getPatientDetails();
  //   }, []);

  //   console.log(appoint);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl border border-gray-200 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Appointment #{appoint.id}
        </h2>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            appoint.status === "scheduled"
              ? "bg-blue-100 text-blue-700"
              : appoint.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {appoint.status}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <PatientDetails patientId={appoint.user_id} />
        <DoctorDetails doctorId={appoint.doctor_id} />
      </div>
      {/* Appointment Meta */}
      <div className="text-sm text-gray-600 mt-2">
        <p>
          <span className="font-medium">Appointment Date:</span>{" "}
          {new Date(appoint.appointment_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p>
          <span className="font-medium">Appointment Date:</span>{" "}
          {new Date(appoint.appointment_date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default AppointmentCard;
