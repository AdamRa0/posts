import styles from "./applayout.module.css";
import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineSettings, MdCreate } from "react-icons/md";

import HeaderComponent from "@components/ui/HeaderComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";
import { AuthContext } from "@contexts/authContext";
import AuthPage from "@pages/AuthPage";
import createPostService from "@services/posts/createPostService";
import { PostType } from "types/data/postFormType";
import { authContextProp } from "types/props/AuthContextProps";

export default function AppLayout(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const [post, setPost] = useState<PostType>({ body: "" });

  const { user } = useContext<authContextProp>(AuthContext);

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleFormModal() {
    setIsFormModalOpen(!isFormModalOpen);
  }

  function handleFormSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setPost({
      body: "",
      file: undefined,
    });

    (async () => {
      await createPostService(post);
    })();

    handleFormModal();
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
              onClick={handleFormModal}
            >
              <MdCreate />
              Post
            </ButtonComponent>
          )}
        </div>
        {isModalOpen ? <AuthPage closeModal={handleModal} /> : null}
        {isFormModalOpen ? (
          <>
            <PostForm
              handleFormModal={handleFormModal}
              handleFormSubmit={handleFormSubmit}
              buttonName="Create Post"
            />
          </>
        ) : null}
        <Outlet />
      </div>
    </>
  );
}
