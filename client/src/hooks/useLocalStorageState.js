import { useState, useEffect } from "react";

/**
 * Custom hook that manages state in local storage.
 *
 * @param {any} initialState - The initial state value.
 * @param {string} key - The key used to store the state in local storage.
 * @returns {[any, function]} - An array containing the current state value and a function to update the state.
 */
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
