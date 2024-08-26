import styles from "./applayout.module.css";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineSettings, MdCreate } from "react-icons/md";

import HeaderComponent from "@components/ui/HeaderComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";
import { useGetAuthenticatedUser } from "@hooks/useGetUser ";
import AuthPage from "@pages/AuthPage";

export default function AppLayout(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const CREATE_POST_ROUTE: string = "/api/v1/posts/create_post";

  const { authenticatedUser } = useGetAuthenticatedUser();


  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div className={styles.header}>
        <HeaderComponent />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.someImportantButtons}>
          <NavLink className={styles.settingsLink} to="/settings">
            <MdOutlineSettings />
            Settings
          </NavLink>
          {authenticatedUser && (
            <ButtonComponent
              variant="createPostButton"
              onClick={handleModal}
            >
              <MdCreate />
              Post
            </ButtonComponent>
          )}
        </div>
        {isModalOpen && !authenticatedUser ? <AuthPage closeModal={handleModal} /> : null}
        {isModalOpen && authenticatedUser ? (
          <>
            <PostForm
              handleFormModal={handleModal}
              formActionRoute={CREATE_POST_ROUTE}
              buttonName="Create Post"
            />
          </>
        ) : null}
        <Outlet />
      </div>
    </>
  );
}
