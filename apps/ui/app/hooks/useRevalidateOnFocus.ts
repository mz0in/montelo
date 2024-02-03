import { useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

export const useRevalidateOnFocus = () => {
  const { revalidate } = useRevalidator();

  useEffect(() => {
    window.addEventListener("focus", revalidate);
    return () => {
      window.removeEventListener("focus", revalidate);
    };
  }, [revalidate]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        revalidate();
      }
    };

    window.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [revalidate]);
};
