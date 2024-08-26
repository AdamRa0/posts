import React, { useEffect, useState } from "react";

import { AuthContext } from "@contexts/authContext";
import { useGetCookie } from "@hooks/useGetCookie";
import useGetUser from "@hooks/useGetUser ";
import { useSignOutUser } from "@hooks/useSignoutUser";
import { useSigninUser } from "@hooks/useSigninUser";
import { signupService } from "@services/auth/signupService";

import { AuthFormState } from "types/states/authFomState";
import { AuthContextProviderProps } from "types/props/AuthContextProviderProps";
import { User } from "types/data/userData";

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps): React.JSX.Element {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  const { cookie: token } = useGetCookie("csrf_access_token");

  const { appUser: user } = useGetUser(undefined, token, true);
  
  const { signOut } = useSignOutUser();

  const { signIn } = useSigninUser();

  useEffect(() => {
    if (user)
      setAuthenticatedUser({
        id: user.id,
        emailAddress: user.email_address,
        username: user.username,
        handle: user.handle,
        bio: user.bio,
        dateCreated: user.date_created,
        profileImage: user.profile_image,
        bannerImage: user.banner_image,
        isActive: user.is_active,
        isPrivate: user.is_private,
      });
  }, [user]);

  async function signUpUser(userDetails: AuthFormState) {
    const statusCode: number = await signupService(userDetails);

    // Authenticated user set to null as it will be fetched by useEffect during re-render
    if (statusCode === 201) {
      setAuthenticatedUser(null);
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user: authenticatedUser,
          signOut,
          signIn,
          signUp: signUpUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
