import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

export function AuthProvider({ children }) {
  const [initialToken] = useState(
    () => localStorage.getItem("token") || sessionStorage.getItem("token"),
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(initialToken));

  useEffect(() => {
    if (!initialToken) return;

    const controller = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${initialToken}`,
          },
          signal: controller.signal,
        });

        const data = await readResponse(response);

        if (!controller.signal.aborted) {
          setUser(data.user);
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => controller.abort();
  }, [initialToken]);

  async function login(email, password, rememberMe = false) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await readResponse(response);

    if (!data.token || !data.user) {
      throw new Error("The login response is missing a token or user.");
    }

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", data.token);
    setUser(data.user);

    return data.user;
  }

  async function register(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await readResponse(response);

    if (!data.token || !data.user) {
      throw new Error("The registration response is missing a token or user.");
    }

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data.user;
  }

  function logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}