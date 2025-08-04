"use client";
import React, { useEffect, useState } from "react";
import { Patient } from "@/types"; // adjust import as needed

const PatientDetails = ({ patientId }: { patientId: number }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const getPatientDetails = async () => {
    const patientRes = await fetch("/api/patient/" + patientId, {
      method: "GET",
    });
    const {data} = await patientRes.json();
    setPatient(data);
    console.log(data);
  };

  useEffect(() => {
    getPatientDetails();
    console.log(patient);
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">{patient?.name}</h3>
      <p className="text-sm text-gray-700">Email: {patient?.email}</p>
      <p className="text-sm text-gray-700">Phone: {patient?.phone}</p>
      <p className="text-sm text-gray-700">
        Age: {patient?.age} | Gender: {patient?.gender}
      </p>
    </div>
  );
};

export default PatientDetails;
