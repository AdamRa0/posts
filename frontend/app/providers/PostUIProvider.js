"use client";

import { createContext, useState } from "react";

export const PostUIContext = createContext();

export default function PostUIProvider({ children }) {
  const [inflateUI, setInflateUI] = useState(false);

  function inflatePostUI() {
    setInflateUI(!inflateUI);
  }

  return (
    <PostUIContext.Provider value={{ inflateUI, inflatePostUI }}>
      {children}
    </PostUIContext.Provider>
  );
}
