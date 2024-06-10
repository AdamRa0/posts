import React, { useState } from "react";
import styles from "./safetyandprivacycomponent.module.css";
import ButtonComponent from "@components/ui/ButtonComponent";
import InputComponent from "@components/ui/InputComponent";
import AccountSettingsModal from "@components/feature/AccountSettingsModal";

export default function SafetyAndPrivacySettingsComponent(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModal() {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  return (
    <>
      {isModalOpen ? (
        <AccountSettingsModal closeModal={handleModal}>
          <form>
            <InputComponent
              className={"formInputModal"}
              type="password"
              placeholder="Enter new password"
            />
            <ButtonComponent variant="modalButtonTwo">
              Change Password
            </ButtonComponent>
          </form>
        </AccountSettingsModal>
      ) : null}
      <div className={styles.acPrivacy}>
        <p>Set account to private:</p>
        <label htmlFor="ac-privacy">
          <InputComponent
            className="switch-input"
            type="checkbox"
            id="ac-privacy"
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
      <ButtonComponent variant="changePassword" onClick={handleModal}>
        Change Password
      </ButtonComponent>
    </>
  );
}
