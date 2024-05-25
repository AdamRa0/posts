import { faker } from "@faker-js/faker";
import ButtonComponent from "./ButtonComponent";
import React, { useReducer, useState } from "react";
import styles from "./accountsettingscomponent.module.css";
import AccountSettingsModal from "./AccountSettingsModal";
import InputComponent from "./InputComponent";

enum ModalTypes {
  ACCOUNT_DEACTIVATION,
  ACCOUNT_DELETION,
  EMAIL_CHANGE,
}

function AccountSettingsReducer(_: number, action: ModalTypes): number {
  switch (action) {
    case ModalTypes.ACCOUNT_DEACTIVATION:
      return 0;
    case ModalTypes.ACCOUNT_DELETION:
      return 1;
    case ModalTypes.EMAIL_CHANGE:
      return 2;
    default:
      return 0;
  }
}

export default function AccountSettingsComponent(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer<
    (currentState: number, action: ModalTypes) => number
  >(AccountSettingsReducer, 0);

  console.log(state);

  function handleModal(): void {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  return (
    <>
      <div>
        <div className={styles.accountEmailSettingsContainer}>
          <div>
            <h3>Email Address</h3>
            <p>{faker.internet.email()}</p>
          </div>
          <ButtonComponent
            variant="priorityThreeButton"
            onClick={() => {
              dispatch(ModalTypes.EMAIL_CHANGE);
              handleModal();
            }}
          >
            Change
          </ButtonComponent>
        </div>
        <div className={styles.accountDeactivateSettingsContainer}>
          <div>
            <h3>Deactivate Account</h3>
          </div>
          <ButtonComponent
            variant="priorityTwoButton"
            onClick={() => {
              dispatch(ModalTypes.ACCOUNT_DEACTIVATION);
              handleModal();
            }}
          >
            Deactivate
          </ButtonComponent>
        </div>
        <div className={styles.accountDeleteSettingsContainer}>
          <div>
            <h3>Delete Account</h3>
          </div>
          <ButtonComponent
            variant="priorityOneButton"
            onClick={() => {
              dispatch(ModalTypes.ACCOUNT_DELETION);
              handleModal();
            }}
          >
            Delete
          </ButtonComponent>
        </div>
      </div>
      {isModalOpen ? (
        <AccountSettingsModal closeModal={handleModal}>
          {state == 0 ? (
            <>
              <h4>You can reactivate your account by signing back in</h4>
              <ButtonComponent variant="modalButtonOne">
                Deactivate Account
              </ButtonComponent>
            </>
          ) : state === 2 ? (
            <>
              <InputComponent
                className={"formInputModal"}
                type="email"
                placeholder="New Email Address"
              />
              <ButtonComponent variant="modalButtonTwo">
                Change Email Address
              </ButtonComponent>
            </>
          ) : (
            <>
              <h4>
                This is a permanent action. Deleting your account will result in
                it being lost forever.
              </h4>
              <ButtonComponent variant="modalButtonThree">
                Delete Account
              </ButtonComponent>
            </>
          )}
        </AccountSettingsModal>
      ) : null}
    </>
  );
}
