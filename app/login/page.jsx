"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/"); // Redirect if already authenticated
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Sign In
        </h1>

        <div
          className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg cursor-pointer transition-all hover:bg-blue-700"
          onClick={() => signIn("google")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill="none"
              d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10S6.5 2 12 2zm0 18c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm-1-13h2v4h-2zm0 6h2v6h-2z"
            />
          </svg>
          <span>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
