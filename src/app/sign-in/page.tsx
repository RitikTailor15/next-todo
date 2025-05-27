"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      router.push("/");
    } else if (res?.status === 401) {
      setError("Invalid Credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <div className="sign-up-container">
      <p className="page-title">SignIn</p>
      <form onSubmit={handleFormSubmit} className="sign-up-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            disabled={pending}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleInputChange}
            disabled={pending}
            type="password"
          />
        </div>
        <button className="submit-btn" onClick={handleFormSubmit}>
          SignIn
        </button>
      </form>
    </div>
  );
};

export default SignIn;
