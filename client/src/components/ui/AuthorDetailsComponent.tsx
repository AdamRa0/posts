import styles from "./authordetailscomponent.module.css";
import React from "react";
import { UUID } from "crypto";

import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";
import AvatarComponent from "@components/ui/AvatarComponent";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

type authorDetailsComponentProps = {
  authorID: UUID;
};

export default function AuthorDetailsComponent({
  authorID,
}: authorDetailsComponentProps): React.JSX.Element {
  const { isLoading, author, error } = useFetchPostAuthorDetails(authorID);

  if (error) {
    toast.error(`${error.message}`);
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.detailsHeader}>
          <AvatarComponent
            imagePath={
              author.profile_image !== "default_profile_image.jpg"
                ? `${authorID}_${author.profile_image}`
                : author.profile_image
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
