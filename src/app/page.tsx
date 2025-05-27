"use client";

import Todo from "@/components/Todo/Todo";
import UserInfo from "@/components/userInfo/UserInfo";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <UserInfo />
      <Todo />
    </SessionProvider>
  );
}
