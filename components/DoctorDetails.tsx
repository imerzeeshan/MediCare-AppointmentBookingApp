"use client";
import { Doctor } from "@/types"; // adjust import as needed
import { useEffect, useState } from "react";

const DoctorDetails = ({ doctorId }: { doctorId: number }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const getDoctorDetails = async () => {
    const docRes = await fetch(`/api/doctor/${doctorId}`, {
      method: "GET",
    });
    const {data} = await docRes.json();
    console.log(data);
    setDoctor(data);
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <div className="flex gap-4">
      <img
        src={doctor?.image_url}
        alt={doctor?.name}
        className="w-24 h-24 rounded-xl object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">{doctor?.name}</h3>
        <p className="text-sm text-gray-600">{doctor?.specialization}</p>
        <p className="text-sm text-gray-600">{doctor?.email}</p>
        <p className="text-sm text-gray-600">{doctor?.hospital_name}</p>
        <p
          className={`text-sm font-medium ${
            doctor?.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {doctor?.available }
        </p>
      </div>
    </div>
  );
};

export default DoctorDetails;
