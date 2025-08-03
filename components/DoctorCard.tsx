"use client";

import Link from "next/link";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  image_url: string;
  available: boolean;
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  console.log(doctor);
  return (
    <div className="bg-white rounded-xl shadow transition-all duration-500 hover:-translate-y-2 p-4">
      <img
        src={doctor.image_url}
        alt={doctor.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialization}</p>
      <p
        className={`mt-1 ${
          doctor.available ? "text-green-600" : "text-red-600"
        }`}
      >
        {doctor.available}
      </p>
      <Link
        href={`/doctor/${doctor.id}`}
        className="text-blue-500 underline mt-2 inline-block"
      >
        View Profile
      </Link>
    </div>
  );
}
