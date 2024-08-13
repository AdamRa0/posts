import styles from "./authordetailscomponent.module.css";
import React from "react";
import { UUID } from "crypto";

import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";
import { PostAuthor } from "types/data/postAuthorData";
import AvatarComponent from "@components/ui/AvatarComponent";
import { NavLink } from "react-router-dom";

type authorDetailsComponentProps = {
  authorID: UUID;
};

export default function AuthorDetailsComponent({
  authorID,
}: authorDetailsComponentProps): React.JSX.Element {
  const author: PostAuthor | undefined = useFetchPostAuthorDetails(authorID);
  return (
    <>
      {author === undefined ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.detailsHeader}>
          <AvatarComponent
            imagePath={
              author.avatar !== "default_profile_image.jpg"
                ? `${authorID}_${author.avatar}`
                : author.avatar
            }
            altText="Post author avatar"
          />
          <div className={styles.postAuthorDetails}>
            <NavLink
              to={`/user/${authorID}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>{author.username}</h4>
            </NavLink>
            <NavLink
              to={`/user/${authorID}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p>{author.handle}</p>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
