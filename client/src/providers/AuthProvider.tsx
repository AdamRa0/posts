import React from "react";

import { AuthContext } from "@contexts/authContext";
import { useSigninUser } from "@hooks/useSigninUser";
import { useSignOutUser } from "@hooks/useSignoutUser";
import { useSignupUser } from "@hooks/useSignupUser";

import { AuthContextProviderProps } from "types/props/AuthContextProviderProps";

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps): React.JSX.Element {

  const { signOut } = useSignOutUser();

  const { signIn } = useSigninUser();

  const { signUp } = useSignupUser();

  return (
    <>
      <AuthContext.Provider
        value={{
          signOut,
          signIn,
          signUp,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
