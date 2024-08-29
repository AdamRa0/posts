import styles from "./profilesettingscomponent.module.css";

import React, { useEffect, useState } from "react";

import InputComponent from "@components/ui/InputComponent";
import ButtonComponent from "@components/ui/ButtonComponent";

import { useGetAuthenticatedUser } from "@hooks/useGetUser ";
import { useChangeDetails } from "@hooks/useChangeDetails";
import { useUpdateImage } from "@hooks/useUpdateImage";

export default function ProfileSettingsComponent(): React.JSX.Element {
  const { authenticatedUser: user } = useGetAuthenticatedUser();

  const [handle, setHandle] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File>();
  const [bannerImg, setBannerImg] = useState<File>();

  const { changeDetails } = useChangeDetails();
  const { updateImage } = useUpdateImage();

  useEffect(() => {
    if (user) {
      setHandle(JSON.parse(JSON.stringify(user)).handle);
      setUsername(JSON.parse(JSON.stringify(user)).username);
    }
  }, [user]);

  function handleUpdateUsernameAndHandle(e: { preventDefault: () => void }) {
    e.preventDefault();

    const updatePayload: {
      email?: string;
      handle?: string;
      username?: string;
    } = {};

    if (handle) {
      updatePayload.handle = handle;
    }

    if (username) {
      updatePayload.username = username;
    }

    if (Object.keys(updatePayload).length > 0) {
      changeDetails(updatePayload);
    }
  }

  function handleUpdateUserImages(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (profileImg) {
      updateImage({ profileImg });
      setProfileImg(undefined);
    }

    if (bannerImg) {
      updateImage({ bannerImg });
      setBannerImg(undefined);
    }

    if (profileImg && bannerImg) {
      updateImage({ profileImg, bannerImg });
      setProfileImg(undefined);
      setBannerImg(undefined);
    }
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
