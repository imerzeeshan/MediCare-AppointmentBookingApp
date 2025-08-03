"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookAppointment = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<Boolean>(true);

  const checkAuthUser = async () => {
    const res = await fetch(`/api/protected`);

    if (res.ok) {
      setLoggedIn(true);
      const { user } = await res.json();
      router.push(`/book/${user.id}`);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  return loggedIn ? (
    <div>Loading...</div>
  ) : (
    <div>Please Login/Register First</div>
  );
};

export default BookAppointment;
