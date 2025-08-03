"use client";

import { useEffect, useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import { useRouter } from "next/navigation";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  image_url: string;
  available: boolean;
};

export default function HomePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const getDoctors = async () => {
    const docRes = await fetch("/api/doctor", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const docs = await docRes.json();
    setDoctors(docs);
    console.log(docs, "doctors");
  };

  const checkToken = async () => {
    const isAuthenticated = await fetch("/api/protected", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(isAuthenticated);
    if (!isAuthenticated.ok) {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();
    getDoctors();

    // fetch("/doctors.json")
    //   .then((res) => res.json())
    //   .then(setDoctors);
  }, [router]);

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Find a Doctor</h1>
      <input
        type="text"
        placeholder="Search by name or specialization"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered?.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </main>
  );
}
