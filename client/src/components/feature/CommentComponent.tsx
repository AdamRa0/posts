import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdModeComment,
} from "react-icons/md";
import styles from "./commentcomponent.module.css";
import React, { useContext, useState } from "react";

import dateFormatter from "@helpers/dateFormatter";
import formatNumber from "@helpers/numericalFormatter";
import ButtonComponent from "@components/ui/ButtonComponent";
import { PostData } from "types/data/postData";

import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";
import { AuthContext } from "@contexts/authContext";
import { authContextProp } from "types/props/AuthContextProps";
import AuthPage from "@pages/AuthPage";
import approvePostService from "@services/posts/approvePostService";
import disapprovePostService from "@services/posts/disapprovePostService";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import PostForm from "@components/feature/forms/PostForm";

type CommentComponentProps = {
  post: PostData;
};

export default function CommentComponent({
  post,
}: CommentComponentProps): React.JSX.Element {
  const postAuthor = useFetchPostAuthorDetails(post.author_id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useContext<authContextProp>(AuthContext);

  const CREATE_COMMENT_ROUTE: string = `/api/v1/posts/${post.id}/create-comment`;

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handlePostInterraction(
    action: string
  ) {

    if (user === null) {
      handleModal();
      return;
    }

    switch (action) {
      case "approve":
        approvePostService(post.id);
        break;

      case "disapprove":
        disapprovePostService(post.id);
        break;

      case "reply":
        handleModal();
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div className={styles.postHeader}>
        {postAuthor === undefined ? (
          <p>Loading...</p>
        ) : (
          <AuthorDetailsComponent authorID={post.author_id} />
        )}
        <p>{dateFormatter(post.time_created)}</p>
      </div>
      <p>{post.body}</p>
      {post.post_file ? (
        <img
          className={styles.postImage}
          src={post.post_file}
          alt="Accompanying post image"
        />
      ) : null}
      <div className={styles.postInteractionButtons}>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("approve")}
        >
          <MdOutlineThumbUp />
          {post.approvals >= 1000
            ? formatNumber(post.approvals)
            : post.approvals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("disapprove")}
        >
          <MdOutlineThumbDown />
          {post.disapprovals >= 1000
            ? formatNumber(post.disapprovals)
            : post.disapprovals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("reply")}
        >
          <MdModeComment />
          Reply
        </ButtonComponent>
      </div>
      {isModalOpen && !user && <AuthPage closeModal={handleModal} />}
      {isModalOpen && user && (
        <PostForm
          handleFormModal={handleModal}
          formActionRoute={CREATE_COMMENT_ROUTE}
          buttonName="Reply"
        />
      )}
    </>
  );
}
