import PostCardAction from "./PostCardAction";
import styles from "./postcardactions.module.scss";

export default function PostCardActions({
  approvals,
  disapprovals,
  reposts,
  comments,
}) {
  return (
    <div className={styles.postCardActions}>
      <PostCardAction
        actionIconPath={"/approve.svg"}
        altText={"Approve Post Icon"}
        numOfActions={approvals}
        actionName={"approvals"}
      />
      <PostCardAction
        actionIconPath={"/disapprove.svg"}
        altText={"Disapprove Post Icon"}
        numOfActions={disapprovals}
        actionName={"disapprovals"}
      />
      <PostCardAction
        actionIconPath={"/repost.svg"}
        altText={"Repost Post Icon"}
        numOfActions={reposts}
        actionName={"reposts"}
      />
      <PostCardAction
        actionIconPath={"/comment.svg"}
        altText={"Comment Post Icon"}
        numOfActions={comments}
        actionName={"comments"}
      />
    </div>
  );
}
