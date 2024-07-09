import styles from "./applayout.module.css";
import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineSettings, MdCreate } from "react-icons/md";

import HeaderComponent from "@components/ui/HeaderComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";
import { AuthContext } from "@contexts/authContext";
import AuthPage from "@pages/AuthPage";
import { authContextProp } from "types/props/AuthContextProps";

export default function AppLayout(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const CREATE_POST_ROUTE: string = "/api/v1/posts/create_post";

  const { user } = useContext<authContextProp>(AuthContext);

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
          {user && (
            <ButtonComponent
              variant="createPostButton"
              onClick={handleModal}
            >
              <MdCreate />
              Post
            </ButtonComponent>
          )}
        </div>
        {isModalOpen && !user ? <AuthPage closeModal={handleModal} /> : null}
        {isModalOpen && user ? (
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
