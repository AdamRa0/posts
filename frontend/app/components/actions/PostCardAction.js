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
      <Image src={actionIconPath} width={20} height={20} alt={altText} />
      <p>
        {numOfActions} {actionName}
      </p>
    </div>
  );
}
