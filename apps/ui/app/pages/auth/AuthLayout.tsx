import React, { ReactNode } from "react";

type AuthLayout = {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayout) {
  return (
    <div className="relative w-full h-screen">
      <div className="flex justify-center items-center w-full h-full pt-8">
        {children}
      </div>
    </div>
  );
}