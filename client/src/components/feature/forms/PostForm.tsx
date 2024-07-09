import styles from './postform.module.css';

import InputComponent from "@components/ui/InputComponent";
import ModalComponent from "@components/ui/ModalComponent";
import PageOverlayComponent from "@components/ui/PageOverlayComponent";
import ButtonComponent from "@components/ui/ButtonComponent"; 
import MarkdownEditor from "@uiw/react-markdown-editor";

import { PostType } from "types/data/postFormType";
import React, { useState } from "react";

type PostFormProps = {
  handleFormModal: () => void;
  handleFormSubmit: (e: { preventDefault: () => void }) => void;
  buttonName: string;
};

export default function PostForm({
  handleFormModal,
  handleFormSubmit,
  buttonName,
}: PostFormProps): React.JSX.Element {
  const [post, setPost] = useState<PostType>({ body: "" });

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

  return (
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
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                {buttonName}
              </ButtonComponent>
            </div>
          </form>
        </ModalComponent>
      </PageOverlayComponent>
    </>
  );
}
