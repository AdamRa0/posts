import React from "react";
import AppRoutes from "@routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App(): React.JSX.Element {
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
      <AppRoutes />
    </>
  );
}
