import { useState, useEffect } from "react";

export function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") ?? null;
    const user = storedUser ? JSON.parse(storedUser) : null;
    setUser(user);
    setIsLoading(false);
  }, []);

  function clearUser() {
    localStorage.removeItem("user");
  }

  function storeUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return {
    user,
    isLoading,
    clearUser,
    storeUser,
    isAuthenticated: user != null,
  };
}
