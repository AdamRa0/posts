import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdModeComment,
} from "react-icons/md";
import styles from "./commentcomponent.module.css";
import React, { useContext, useState } from "react";

import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";
import { AuthContext } from "@contexts/authContext";

import dateFormatter from "@helpers/dateFormatter";
import formatNumber from "@helpers/numericalFormatter";
import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";

import AuthPage from "@pages/AuthPage";
import approvePostService from "@services/posts/approvePostService";
import disapprovePostService from "@services/posts/disapprovePostService";
import { authContextProp } from "types/props/AuthContextProps";
import { PostData } from "types/data/postData";
import ListComponent from "../ui/ListComponent";

type CommentComponentProps = {
  post: PostData;
};

export default function CommentComponent({
  post,
}: CommentComponentProps): React.JSX.Element {
  const postAuthor = useFetchPostAuthorDetails(post.author_id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const { user } = useContext<authContextProp>(AuthContext);
  // const { replies } = useContext<PostContextProps>(PostContext);

  const CREATE_COMMENT_ROUTE: string = `/api/v1/posts/${post.id}/create-comment`;

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handlePostInterraction(action: string) {
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

  function handleShowReplies() {
    setShowReplies(!showReplies);
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
      {post.children!.length > 0 && (
        <ButtonComponent variant="linkButton" onClick={handleShowReplies}>
          {showReplies ? "Hide Replies" : "Show Replies"}
        </ButtonComponent>
      )}
      {showReplies && (
        <div className={styles.nestedComment}>
          <ListComponent
            data={post.children as PostData[]}
            typeOfData="comment"
          />
        </div>
      )}
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
