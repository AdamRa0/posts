import { MdSearch } from "react-icons/md";
import { FiMoreHorizontal, FiLogIn } from "react-icons/fi";
import { useContext, useState } from "react";

import AvatarComponent from "./AvatarComponent";
import ListComponent from "./ListComponent";
import styles from "./headercomponent.module.css";

import InputComponent from "@components/ui/InputComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import { AuthContext } from "@contexts/authContext";
import { useGetAuthenticatedUser } from "@hooks/useGetUser ";
import useGetUsers from "@hooks/useGetUsers";
import AuthPage from "@pages/AuthPage";
import { authContextProp } from "types/props/AuthContextProps";

export default function HeaderComponent() {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { signOut } = useContext<authContextProp>(AuthContext);
  const { users } = useGetUsers();
  const [queriedUsers, setQueriedUsers] = useState(users);

  const { authenticatedUser } = useGetAuthenticatedUser();

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

  function handleSearch(query: string) {
    const filteredUsers = users.filter((user) => user.handle.includes(query));
    setQueriedUsers([...filteredUsers]);
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
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <span className={styles.searchLogoContainer}>
            <MdSearch className={styles.searchLogo} />
          </span>
        </div>
        <div className={styles.headerOptions}>
          {!authenticatedUser ? (
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
                imagePath={authenticatedUser.profile_image}
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
      {isFocus && (
        <div
          className={styles.queryContentContainer}
          tabIndex={0}
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ListComponent data={queriedUsers} typeOfData="user" />
        </div>
      )}
    </>
  );
}
