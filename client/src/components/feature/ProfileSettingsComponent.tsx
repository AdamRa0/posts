import styles from "./profilesettingscomponent.module.css";

import React from "react";
import InputComponent from "../ui/InputComponent";
import ButtonComponent from "../ui/ButtonComponent";

export default function ProfileSettingsComponent(): React.JSX.Element {
  return (
    <>
      <h5>Username and Handle</h5>
      <div>
        <form className={styles.userDetailsForm}>
          <label htmlFor="username">Username</label>
          <InputComponent className="formInput" type="text" id="username" />
          <label htmlFor="handle">Handle</label>
          <InputComponent className="formInput" type="text" id="handle" />
          <ButtonComponent variant="userDetailsForm">
            Update Username and Handle
          </ButtonComponent>
        </form>
      </div>

      <h5>Banner and Profile Images</h5>
      <div>
        <form className={styles.userDetailsForm}>
          <label htmlFor="banner-image">Banner Image</label>
          <InputComponent className="" type="file" id="banner-image" />
          <label htmlFor="profile-image">Handle</label>
          <InputComponent className="" type="file" id="profile-image" />
          <ButtonComponent variant="userDetailsForm">
            Update Profie and Banner Images
          </ButtonComponent>
          <br />
        </form>
      </div>
    </>
  );
}
