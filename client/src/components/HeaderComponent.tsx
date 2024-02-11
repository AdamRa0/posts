import { MdSearch } from "react-icons/md";
import { FiMoreHorizontal, FiLogIn } from "react-icons/fi";
import { useState } from "react";

import styles from "./headercomponent.module.css";

import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import LoginPage from "../pages/LoginPage";

export default function HeaderComponent() {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  function handleClick() {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  }

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
  }

  function handleOpenLoginModal() {
    setIsOptionsMenuOpen(false);
    setIsLoginModalOpen(true);
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
            type={"text"}
            placeholder={"Search Posts"}
          />
          <span className={styles.searchLogoContainer}>
            <MdSearch className={styles.searchLogo} />
          </span>
        </div>
        <div className={styles.headerOptions}>
          <ButtonComponent type={"btnSignIn"}>Sign In</ButtonComponent>
          <ButtonComponent type={"moreOptions"} onButtonClick={handleClick}>
            <FiMoreHorizontal className="optionsMenuIcon" />
          </ButtonComponent>
        </div>
        {isOptionsMenuOpen ? (
          <div
            className={styles.headerOptionsMenu}
            tabIndex={0}
            onClick={handleOpenLoginModal}
          >
            <FiLogIn />
            <p>Log In / Sign Up</p>
          </div>
        ) : null}
      </header>
      {isLoginModalOpen ? (
        <LoginPage closeModal={handleCloseLoginModal} />
      ) : null}
    </>
  );
}
