"use client";

import useGetCSRFAccessToken from "../hooks/useGetCSRFAccessToken";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const AUTH_TOKEN = useGetCSRFAccessToken();
  const [user, setUser] = useState();

  useEffect(() => {
    if (AUTH_TOKEN === undefined) {
      setUser(null);
    } else {
      axios
        .get("/api/v1/users/profile", {
          headers: {
            "X-CSRF-TOKEN": AUTH_TOKEN,
          },
        })
        .then(function (response) {
          const storedUser = response.data;
          setUser({
            ...storedUser,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
