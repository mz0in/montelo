import React from "react";
import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="relative w-full h-screen">
      <div className="flex justify-center items-center w-full fixed mt-12 gap-2">
        <img src={"/logo.png"} alt="Logo" className="h-10" />
        <h1 className={"text-4xl"}>MonteloAI</h1>
      </div>
      <div className="flex justify-center items-center w-full h-full pt-8">
        <Outlet />
      </div>
    </div>
  );
}
