import { MdSearch } from "react-icons/md";
import { FiMoreHorizontal, FiLogIn } from "react-icons/fi";
import { useContext, useState } from "react";

import styles from "./headercomponent.module.css";

import InputComponent from "@components/ui/InputComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import AuthPage from "@pages/AuthPage";
import { AuthContext } from "@contexts/authContext";
import { authContextProp } from "types/props/AuthContextProps";
import AvatarComponent from "./AvatarComponent";

export default function HeaderComponent() {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user, signOut } = useContext<authContextProp>(AuthContext);

  function handleClick() {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsOptionsMenuOpen(false);
    setIsModalOpen(true);
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.homePageIdentifier} role="alert">
          Home Page
        </h1>
        <div>
          <img className={styles.logo} src="/posts-logo.svg" alt="Site Logo" />
        </div>
        <div className={styles.searchContainer}>
          <InputComponent
            className={"search"}
            type="text"
            placeholder="Search Posts"
          />
          <span className={styles.searchLogoContainer}>
            <MdSearch className={styles.searchLogo} />
          </span>
        </div>
        <div className={styles.headerOptions}>
          {!user ? (
            <>
              <ButtonComponent
                type="button"
                variant={"btnSignIn"}
                onClick={handleOpenModal}
              >
                Sign In
              </ButtonComponent>
              <ButtonComponent
                type="button"
                variant={"moreOptions"}
                onClick={handleClick}
              >
                <FiMoreHorizontal className="optionsMenuIcon" />
              </ButtonComponent>
            </>
          ) : (
            <>
              <AvatarComponent
                imagePath={user.profileImage}
                altText="Logged in user avatar"
              />
              <ButtonComponent
                onClick={() => {
                  signOut!();
                }}
                type="button"
                variant={"btnSignIn"}
              >
                Log Out
              </ButtonComponent>
            </>
          )}
        </div>
        {isOptionsMenuOpen ? (
          <div
            className={styles.headerOptionsMenu}
            tabIndex={0}
            onClick={handleOpenModal}
          >
            <FiLogIn />
            <p>Log In / Sign Up</p>
          </div>
        ) : null}
      </header>
      {isModalOpen ? <AuthPage closeModal={handleCloseModal} /> : null}
    </>
  );
}
