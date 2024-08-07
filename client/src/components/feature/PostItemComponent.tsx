import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdModeComment,
} from "react-icons/md";
import styles from "./postitemcomponent.module.css";
import React, { useContext, useState } from "react";

import dateFormatter from "@helpers/dateFormatter";
import formatNumber from "@helpers/numericalFormatter";
import ButtonComponent from "@components/ui/ButtonComponent";
import { PostData } from "types/data/postData";

import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";
import { AuthContext } from "@contexts/authContext";
import { authContextProp } from "types/props/AuthContextProps";
import AuthPage from "@pages/AuthPage";
import { useNavigate } from "react-router-dom";
import approvePostService from "@services/posts/approvePostService";
import disapprovePostService from "@services/posts/disapprovePostService";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";

type PostItemComponentProps = {
  post: PostData;
};

export default function PostItemComponent({
  post,
}: PostItemComponentProps): React.JSX.Element {
  const postAuthor = useFetchPostAuthorDetails(post.author_id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useContext<authContextProp>(AuthContext);
  const navigate = useNavigate();

  function handleModal(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  }

  function handlePostInterraction(
    e: { stopPropagation: () => void },
    action: string
  ) {
    e.stopPropagation();

    if (user === null) {
      setIsModalOpen(true);
      return;
    }

    switch (action) {
      case "approve":
        approvePostService(post.id);
        break;

      case "disapprove":
        disapprovePostService(post.id);
        break;

      case "comment":
        navigate(`/post/${post.id}`);
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
          onClick={(e) => handlePostInterraction(e, "approve")}
        >
          <MdOutlineThumbUp />
          {post.approvals >= 1000
            ? formatNumber(post.approvals)
            : post.approvals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={(e) => handlePostInterraction(e, "disapprove")}
        >
          <MdOutlineThumbDown />
          {post.disapprovals >= 1000
            ? formatNumber(post.disapprovals)
            : post.disapprovals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={(e) => handlePostInterraction(e, "comment")}
        >
          <MdModeComment />
          {post.comments >= 1000 ? formatNumber(post.comments) : post.comments}
        </ButtonComponent>
      </div>
      {isModalOpen ? <AuthPage closeModal={(e) => handleModal(e)} /> : null}
    </>
  );
}
