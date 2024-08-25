import styles from "./avatarcomponent.module.css";

import useFetchImage from "@hooks/useFetchImage";
import React from "react";

type AvatarComponentProps = {
  imagePath: string;
  altText: string;
};

export default function AvatarComponent({
  imagePath,
  altText,
}: AvatarComponentProps): React.JSX.Element {
  const { image } = useFetchImage(imagePath);

  return <img className={styles.authorAvatar} src={image} alt={altText} />;
}
