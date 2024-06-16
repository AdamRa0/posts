import React, { useEffect, useState } from "react";
import styles from "./postitemcomponent.module.css";
import dateFormatter from "@helpers/dateFormatter";
import formatNumber from "@helpers/numericalFormatter";
import ButtonComponent from "@components/ui/ButtonComponent";
import { PostData } from "types/data/postData";

import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdModeComment,
} from "react-icons/md";
import useFetchPostAuthorDetails from "@/hooks/useFetchPostAuthorDetails";

type PostItemComponentProps = {
  post: PostData;
};

export default function PostItemComponent({
  post,
}: PostItemComponentProps): React.JSX.Element {
  const postAuthor = useFetchPostAuthorDetails(post.author_id);
  const [authorImage, setAuthorImage] = useState<string>("");

  useEffect(() => {
    if (postAuthor) {
      fetch(`/api/v1/media/${postAuthor.avatar}`)
        .then((response) => response.blob())
        .then((imageBlob) => {
          const imageURL = URL.createObjectURL(imageBlob);
          setAuthorImage(imageURL);
        });
    }
  }, [postAuthor]);

  return (
    <>
      <div className={styles.postHeader}>
        {postAuthor === undefined ? (
          <p>Loading...</p>
        ) : (
          <>
            <img
              className={styles.authorAvatar}
              src={authorImage}
              alt="Post author avatar"
            />
            <div className={styles.postUserDetails}>
              <h4>{postAuthor!.username}</h4>
              <p>{postAuthor!.handle}</p>
            </div>
          </>
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
        <ButtonComponent variant="postInteractionButton">
          <MdOutlineThumbUp />
          {post.approvals >= 1000
            ? formatNumber(post.approvals)
            : post.approvals}
        </ButtonComponent>
        <ButtonComponent variant="postInteractionButton">
          <MdOutlineThumbDown />
          {post.disapprovals >= 1000
            ? formatNumber(post.disapprovals)
            : post.disapprovals}
        </ButtonComponent>
        <ButtonComponent variant="postInteractionButton">
          <MdModeComment />
          {post.comments >= 1000 ? formatNumber(post.comments) : post.comments}
        </ButtonComponent>
      </div>
    </>
  );
}
