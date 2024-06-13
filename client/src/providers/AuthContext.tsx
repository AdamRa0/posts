import { signoutService } from "@/services/auth/signoutService";
import { getUserService } from "@/services/user/getUser";
import { User } from "types/data/userData";
import { AuthContext } from "@contexts/authContext";
import { getCookie } from "@helpers/extractCookie";
import React, { ReactNode, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

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

  return (
    <>
      <AuthContext.Provider
        value={{ user: authenticatedUser, signOut: signOutUser }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
