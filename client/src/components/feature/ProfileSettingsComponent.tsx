import styles from "./profilesettingscomponent.module.css";

import React, { useContext, useEffect, useState } from "react";

import InputComponent from "@components/ui/InputComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import { AuthContext } from "@contexts/authContext";

import { authContextProp } from "types/props/AuthContextProps";
import { updateUserDetailsService } from "@/services/user/updateUserDetails";
import { updateUserImagesService } from "@/services/user/updateUserImages";

export default function ProfileSettingsComponent(): React.JSX.Element {
  const { user } = useContext<authContextProp>(AuthContext);

  const [handle, setHandle] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File>();
  const [bannerImg, setBannerImg] = useState<File>();

  useEffect(() => {
    if (user) {
      setHandle(JSON.parse(JSON.stringify(user)).handle);
      setUsername(JSON.parse(JSON.stringify(user)).username);
    }
  }, [user]);

  function handleUpdateUsernameAndHandle(e: { preventDefault: () => void }) {
    e.preventDefault();

    const { username: userName, handle: userHandle } = JSON.parse(
      JSON.stringify(user)
    );

    if (username !== userName && handle === userHandle)
      updateUserDetailsService(undefined, undefined, username);

    if (handle !== userHandle && username === userName)
      updateUserDetailsService(undefined, handle, undefined);

    if (handle !== userHandle && username !== userName)
      updateUserDetailsService(undefined, handle, username);
  }

  function handleUpdateUserImages(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (profileImg) updateUserImagesService(profileImg, undefined);
    if (bannerImg) updateUserImagesService(undefined, bannerImg);

    if (bannerImg && profileImg) updateUserImagesService(profileImg, bannerImg);
  }

  return (
    <>
      <h5>Username and Handle</h5>
      <div>
        <form
          className={styles.userDetailsForm}
          onSubmit={handleUpdateUsernameAndHandle}
        >
          <label htmlFor="username">Username</label>
          <InputComponent
            className="formInput"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="handle">Handle</label>
          <InputComponent
            className="formInput"
            type="text"
            id="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <ButtonComponent variant="userDetailsForm" type="submit">
            Update Username and Handle
          </ButtonComponent>
        </form>
      </div>

      <h5>Banner and Profile Images</h5>
      <div>
        <form
          className={styles.userDetailsForm}
          onSubmit={handleUpdateUserImages}
        >
          <label htmlFor="banner-image">Banner Image</label>
          <InputComponent
            className=""
            type="file"
            id="banner-image"
            onChange={(e) => setBannerImg(e.target.files![0])}
          />
          <label htmlFor="profile-image">Profile Image</label>
          <InputComponent
            className=""
            type="file"
            id="profile-image"
            onChange={(e) => setProfileImg(e.target.files![0])}
          />
          <ButtonComponent variant="userDetailsForm" type="submit">
            Update Profie and Banner Images
          </ButtonComponent>
          <br />
        </form>
      </div>
    </>
  );
}
