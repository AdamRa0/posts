import styles from "./postcardaction.module.scss";
import Image from "next/image";

export default function PostCardAction({
  actionIconPath,
  altText,
  numOfActions,
  actionName,
}) {
  return (
    <div tabIndex={0} className={styles.postCardActionItem}>
      <Image src={actionIconPath} width={16} height={16} alt={altText} />
      <p>
        {numOfActions}{" "}
        <span className={styles.postCardActionName}>{actionName}</span>
      </p>
    </div>
  );
}
