import { signoutService } from "@services/auth/signoutService";
import { getUserService } from "@services/user/getUser";
import { User } from "types/data/userData";
import { AuthContext } from "@contexts/authContext";
import { getCookie } from "@helpers/extractCookie";
import React, { useEffect, useState } from "react";
import { AuthFormState } from "types/states/authFomState";
import { signinService } from "@services/auth/signinService";
import { signupService } from "@services/auth/signupService";
import { AuthContextProviderProps } from "types/props/AuthContextProviderProps";

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps): React.JSX.Element {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>();

  const token: string | undefined = getCookie("csrf_access_token");

  useEffect(() => {
    getUserService(token!)
      .then((data) => {
        setAuthenticatedUser({
          id: data.id,
          emailAddress: data.emailAddress,
          username: data.username,
          handle: data.handle,
          bio: data.bio,
          dateCreated: data.date_created,
          profileImage: data.profile_image,
          bannerImage: data.banner_image,
          isActive: data.is_active,
          isPrivate: data.is_private,
        });
      })
      .catch((e) => console.log(e));
  }, [token]);

  async function signOutUser() {
    const statusCode: number = await signoutService();

    if (statusCode === 200) {
      setAuthenticatedUser(null);
    }
  }

  async function signInUser(userDetails: AuthFormState) {
    const statusCode: number = await signinService(userDetails);

    // Authenticated user set to null as it will be fetched by useEffect during re-render
    if (statusCode === 200) {
      setAuthenticatedUser(null);
    }
  }

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
          signOut: signOutUser,
          signIn: signInUser,
          signUp: signUpUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
