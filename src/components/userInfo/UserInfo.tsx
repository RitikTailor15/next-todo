import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const UserInfo = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return "..loading";
  }

  if (status === "unauthenticated") {
    router.push("/sign-in");
  }
  const handleSignout = () => {
    signOut();
  };

  return (
    <nav className="userInfo">
      <p className="username">{session?.user?.name}</p>
      <button className="signout-btn" onClick={handleSignout}>
        Signout
      </button>
    </nav>
  );
};

export default UserInfo;
