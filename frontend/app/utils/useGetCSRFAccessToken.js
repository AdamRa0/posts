import { useMemo } from "react";

export default function useGetCSRFAccessToken() {
  const csrf_access_token = useMemo(() => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1];
  }, []);

  return csrf_access_token;
}
