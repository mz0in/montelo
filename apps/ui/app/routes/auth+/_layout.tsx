import React from "react";
import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="relative w-full h-screen">
      <div className="bg-auth fixed top-0 left-0 right-0 bottom-0 -z-10 bg-cover bg-center">
      </div>
      <div className="flex justify-center items-center w-full fixed top-0 z-20 pt-12">
        <img src={"/logo.png"} alt="Logo" className="h-14" />
      </div>
      <div className="flex justify-center items-center w-full h-full pt-8">
        <Outlet />
      </div>
    </div>
  );
}
