import React, { useState } from "react";
// import styles from "./safetyandprivacycomponent.module.css";
import ButtonComponent from "@components/ui/ButtonComponent";
import InputComponent from "@components/ui/InputComponent";
import AccountSettingsModal from "@components/feature/AccountSettingsModal";
import { changePasswordService } from "@services/user/changePasswordService";

export default function SafetyAndPrivacySettingsComponent(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  function handleModal() {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  function handleChangePassword(e: { preventDefault: () => void; }) {
    e.preventDefault();
    changePasswordService(password);
    setPassword("")
  }

  return (
    <>
      {isModalOpen ? (
        <AccountSettingsModal closeModal={handleModal}>
          <form onSubmit={handleChangePassword}>
            <InputComponent
              className={"formInputModal"}
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonComponent variant="modalButtonTwo" type="submit">
              Change Password
            </ButtonComponent>
          </form>
        </AccountSettingsModal>
      ) : null}
      {/* <div className={styles.acPrivacy}>
        <p>Set account to private:</p>
        <label htmlFor="ac-privacy">
          <InputComponent
            className="switch-input"
            type="checkbox"
            id="ac-privacy"
            checked={userPrivate}
            onChange={setAccountPrivacyService}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div> */}
      <ButtonComponent variant="changePassword" onClick={handleModal}>
        Change Password
      </ButtonComponent>
    </>
  );
}
