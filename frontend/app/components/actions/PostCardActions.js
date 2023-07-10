import PostCardAction from "./PostCardAction";
import styles from "./postcardactions.module.scss";
import { faker } from "@faker-js/faker";

export default function PostCardActions() {
  function numOfActionsGenerator() {
    return faker.number.int({ min: 0, max: 300 });
  }

  return (
    <div className={styles.postCardActions}>
      <PostCardAction
        actionIconPath={"/approve.svg"}
        altText={"Approve Post Icon"}
        numOfActions={numOfActionsGenerator()}
        actionName={"approvals"}
      />
      <PostCardAction
        actionIconPath={"/disapprove.svg"}
        altText={"Disapprove Post Icon"}
        numOfActions={numOfActionsGenerator()}
        actionName={"disapprovals"}
      />
      <PostCardAction
        actionIconPath={"/repost.svg"}
        altText={"Repost Post Icon"}
        numOfActions={numOfActionsGenerator()}
        actionName={"reposts"}
      />
      <PostCardAction
        actionIconPath={"/comment.svg"}
        altText={"Comment Post Icon"}
        numOfActions={numOfActionsGenerator()}
        actionName={"comments"}
      />
    </div>
  );
}
