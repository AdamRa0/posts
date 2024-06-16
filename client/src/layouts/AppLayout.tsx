import { useContext, useState } from "react";
import HeaderComponent from "../components/ui/HeaderComponent";
import styles from "./applayout.module.css";
import ButtonComponent from "@components/ui/ButtonComponent";
import { MdOutlineSettings, MdCreate } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import AuthPage from "@pages/AuthPage";
import { AuthContext } from "@contexts/authContext";
import { authContextProp } from "types/props/AuthContextProps";
import PageOverlayComponent from "@components/ui/PageOverlayComponent";
import ModalComponent from "@components/ui/ModalComponent";
import MarkdownEditor from "@uiw/react-markdown-editor";
import InputComponent from "@/components/ui/InputComponent";
import { PostType } from "types/data/postFormType";
import createPostService from "@/services/posts/createPostService";

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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      file: e.target.files![0] as File,
    });
  }

  function handleBodyChange(value: string) {
    setPost({
      ...post,
      body: value,
    });
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
            <PageOverlayComponent>
              <ModalComponent
                closeModal={handleFormModal}
                isVisible={true}
                variant="postFormModal"
              >
                <form onSubmit={handleFormSubmit}>
                  <MarkdownEditor
                    value={post.body}
                    width="45dvw"
                    height="50dvh"
                    onChange={(value, _) => handleBodyChange(value)}
                  />
                  <div className={styles.postFormButtons}>
                    <InputComponent
                      type="file"
                      className="postFormInput"
                      onChange={handleFileChange}
                    />
                    <ButtonComponent
                      variant="modalButtonTwo"
                      type="submit"
                      disabled={post.body.length === 0}
                    >
                      Create Post
                    </ButtonComponent>
                  </div>
                </form>
              </ModalComponent>
            </PageOverlayComponent>
          </>
        ) : null}
        <Outlet />
      </div>
    </>
  );
}
