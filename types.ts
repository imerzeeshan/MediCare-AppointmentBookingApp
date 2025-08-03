export type Appoint = {
  id: number;
  user_id: number;
  doctor_id: number;
  email: string;
  status: "scheduled" | "completed" | "cancelled";
  appointment_date: string;
  created_at: string;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  hospital_name: string;
  image_url: string;
  available: string;
  created_at: string;
  bio: string;
};

export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
};
