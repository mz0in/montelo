import { useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

export const useRevalidateOnReconnect = () => {
  const { revalidate } = useRevalidator();

  useEffect(() => {
    window.addEventListener("online", revalidate);
    return () => {
      window.removeEventListener("online", revalidate);
    };
  }, [revalidate]);
};
