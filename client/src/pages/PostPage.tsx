import {
  MdModeComment,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdArrowBack,
  MdAdd,
} from "react-icons/md";
import styles from "./postpage.module.css";

import ButtonComponent from "@components/ui/ButtonComponent";
import formatNumber from "@helpers/numericalFormatter";
import dateFormatter from "@helpers/dateFormatter";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { authContextProp } from "types/props/AuthContextProps";
import { AuthContext } from "@contexts/authContext";
import fetchPostService from "@services/posts/fetchPostService";
import { PostData } from "types/data/postData";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import AuthPage from "@pages/AuthPage";

export default function PostPage(): React.JSX.Element {
  const [postImage, setPostImage] = useState<string>("");
  const [post, setPost] = useState<PostData | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useContext<authContextProp>(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetchPostService(postId!)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        if (data.post_file) setPostImage(data.post_file);
      });
  }, [postId]);

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleBackNavigation(): void {
    navigate(-1);
  }

  function handleCommentModal() {
    if (user === null) {
      handleModal();
      return;
    }
  }

  if (post === undefined)
    return (
      <div className={styles.contentContainer}>
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.postHeader}>
          <ButtonComponent
            variant="postBackButton"
            onClick={handleBackNavigation}
          >
            <MdArrowBack size={24} />
          </ButtonComponent>
          <AuthorDetailsComponent authorID={post.author_id} />
          <p>{dateFormatter(post!.time_created)}</p>
        </div>
        <p>{post!.body}</p>
        {postImage ? (
          <img
            className={styles.postImage}
            src={postImage}
            alt="Accompanying post image"
          />
        ) : null}
        <div className={styles.postInteractionButtons}>
          <ButtonComponent variant="postInteractionButton">
            <MdOutlineThumbUp />
            {post!.approvals >= 1000
              ? formatNumber(post!.approvals)
              : post!.approvals}
          </ButtonComponent>
          <ButtonComponent variant="postInteractionButton">
            <MdOutlineThumbDown />
            {post!.disapprovals >= 1000
              ? formatNumber(post!.disapprovals)
              : post!.disapprovals}
          </ButtonComponent>
          <ButtonComponent variant="postInteractionButton">
            <MdModeComment />
            {post!.comments >= 1000
              ? formatNumber(post!.comments)
              : post!.comments}
          </ButtonComponent>
        </div>
        <div>
          <ButtonComponent variant="addCommentButton" onClick={handleCommentModal}>
            <MdAdd size={20} />
            Add Comment
          </ButtonComponent>
        </div>
        <div className={styles.commentSection}>No Comments Yet</div>
      </div>
      {isModalOpen && user === null ? <AuthPage closeModal={handleModal}/> : null}
    </>
  );
}
