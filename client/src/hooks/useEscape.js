import { useEffect } from "react";

/**
 * Custom hook that listens for the "Escape" key press and invokes the provided callback function.
 * @param {Function} callback - The callback function to be invoked when the "Escape" key is pressed.
 */
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
