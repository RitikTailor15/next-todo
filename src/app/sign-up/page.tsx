"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UserDataI {
  name?: string;
  email?: string;
  password?: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<UserDataI>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const result = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await result.json();
    if (result.ok) {
      setPending(false);
      router.push("/sign-in");
    } else if (result.status === 400) {
      setPending(false);
      setError(data.message);
    } else if (result.status === 500) {
      setPending(false);
      setError(data.message);
    }
  };

  return (
    <div className="sign-up-container">
      <p className="page-title">SignUp</p>
      <form onSubmit={handleFormSubmit} className="sign-up-form">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleInputChange}
            disabled={pending}
          />
        </div>
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
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
