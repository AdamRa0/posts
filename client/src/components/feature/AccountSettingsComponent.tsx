import ButtonComponent from "@components/ui/ButtonComponent";
import React, { useEffect, useReducer, useState } from "react";
import styles from "./accountsettingscomponent.module.css";
import AccountSettingsModal from "@components/feature/AccountSettingsModal";
import InputComponent from "@components//ui/InputComponent";
import { updateUserDetailsService } from "@services/user/updateUserDetails";
import deactivateUserService from "@services/user/deactivateUserService";
import deleteUserService from "@services/user/deleteUserService";
import { useGetAuthenticatedUser } from "@/hooks/useGetUser ";

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
  const { authenticatedUser } = useGetAuthenticatedUser();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmailAddress] = useState<string>("");
  const [state, dispatch] = useReducer<
    (currentState: number, action: ModalTypes) => number
  >(AccountSettingsReducer, 0);

  function handleModal(): void {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  function handleChangeEmailAddressForm(e: { preventDefault: () => void }) {
    e.preventDefault();
    updateUserDetailsService(email);
    handleModal();
  }

  useEffect(() => {
    if (authenticatedUser) {
      setEmailAddress(JSON.parse(JSON.stringify(authenticatedUser)).email_address);
    }
  }, [authenticatedUser]);

  return (
    <>
      <div>
        <div className={styles.accountEmailSettingsContainer}>
          <div>
            <h3>Email Address</h3>
            <p>{email}</p>
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
              <ButtonComponent
                variant="modalButtonOne"
                onClick={deactivateUserService}
              >
                Deactivate Account
              </ButtonComponent>
            </>
          ) : state === 2 ? (
            <form onSubmit={handleChangeEmailAddressForm}>
              <InputComponent
                className={"formInputModal"}
                type="email"
                value={email}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <ButtonComponent variant="modalButtonTwo" type="submit">
                Change Email Address
              </ButtonComponent>
            </form>
          ) : (
            <>
              <h4>
                This is a permanent action. Deleting your account will result in
                it being lost forever.
              </h4>
              <ButtonComponent
                variant="modalButtonThree"
                onClick={deleteUserService}
              >
                Delete Account
              </ButtonComponent>
            </>
          )}
        </AccountSettingsModal>
      ) : null}
    </>
  );
}
