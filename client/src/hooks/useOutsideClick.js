import { useEffect, useRef } from "react";

/**
 * Custom hook that detects clicks outside of a specified element.
 *
 * @param {Function} handler - The callback function to be executed when a click occurs outside the element.
 * @param {boolean} [listenCapturing=true] - Specifies whether the click event should be captured during the capturing phase.
 * @returns {Object} - A ref object that can be attached to the element to be monitored for outside clicks.
 */
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
