"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Doctor } from "@/types"; // adjust import as needed

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const getDoctorDetails = async () => {
    const res = await fetch(`/api/doctor/${id}`, {
      method: "GET",
    });
    const doc = await res.json();
    setDoctor(doc);
    console.log(doc);
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return doctor ? (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={doctor.image_url}
          alt={doctor.name}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow"
        />
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {doctor.name}
          </h2>
          <p className="text-blue-600 font-medium mt-1">
            {doctor.specialization}
          </p>
          <p
            className={`text-sm font-medium ${
              doctor?.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {doctor?.available}
          </p>
          <p className="text-sm text-gray-500 mt-1">{doctor.hospital_name}</p>
          <p className="mt-4 text-gray-700">{doctor.bio}</p>

          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Email:</span> {doctor.email}
            </p>
            <p>
              <span className="font-medium">Joined:</span>{" "}
              {new Date(doctor.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <Link
        href={`/book/${doctor.id}`}
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Book Appointment
      </Link>
    </div>
  ) : (
    <div className="text-center h-[500px] flex justify-center items-center">
      <h1>Loading...</h1>
    </div>
  );
}
