import { useEffect } from "react";

export function useEscape(callback) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [callback]);
}
