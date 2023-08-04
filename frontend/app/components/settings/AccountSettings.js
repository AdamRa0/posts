import styles from "./accountsettings.module.scss";

import { AuthContext } from "@/app/providers/AuthProvider";
import InputComponent from "../inputs/InputComponent";
import Button from "../buttons/Button";

import { useContext, useState } from "react";

export default function AccountSettings() {
  const authenticatedUser = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [disabled, setDisabled] = useState(true);

  function handleOnChange(event, name) {
    switch (name) {
      case "username":
        setUsername(event.target.value);
        break;

      case "handle":
        setHandle(event.target.value);
        break;

      case "email":
        setEmailAddress(event.target.value);
        break;

      default:
        break;
    }

    setDisabled(false);
  }

  return (
    <>
      <div className={styles.userDetailsSettings}>
        <form>
          <div className={styles.formItem}>
            <label htmlFor="emailAddress">Email</label>
            <InputComponent
              type={"email"}
              id={"emailAddress"}
              name={"email"}
              handleOnChange={handleOnChange}
              required={false}
              placeholder={authenticatedUser.email_address}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="handle">Handle</label>
            <InputComponent
              type={"text"}
              id={"handle"}
              name={"handle"}
              handleOnChange={handleOnChange}
              required={false}
              placeholder={authenticatedUser.handle}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="username">Username</label>
            <InputComponent
              type={"text"}
              id={"username"}
              name={"username"}
              handleOnChange={handleOnChange}
              required={false}
              placeholder={authenticatedUser.username}
            />
          </div>
          <Button text={"Save"} type={"submit"} disable={disabled} />
        </form>
      </div>
      <div className={styles.userImagesSettings}>
        <form>
          <div className={styles.imageSettingsItem}>
            <label htmlFor="profile-picture">New Profile Image:</label>
            <input
              id="profile-picture"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div className={styles.imageSettingsItem}>
            <label htmlFor="banner-picture">New Banner Image:</label>
            <input
              id="banner-picture"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <Button text={"Update Images"} type={"submit"} />
        </form>
      </div>
    </>
  );
}
