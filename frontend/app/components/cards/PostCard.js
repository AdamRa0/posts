import styles from "./postcard.module.scss";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import PostCardActions from "../actions/PostCardActions";

export default function PostCard({ post, postIndex }) {
  return (
    <div className={styles.postCard}>
      <div className={styles.postCardHeader}>
        <Image
          src={faker.internet.avatar()}
          height={70}
          width={70}
          alt="User profive avatar"
        />
        <div>
          <h3 tabIndex={0}>{faker.internet.displayName()}</h3>
          <h4 tabIndex={0}>{`@${faker.internet.displayName()}`}</h4>
        </div>
        <h4 className={styles.timeStamp}>{`${faker.number.int({
          min: 1,
          max: 10,
        })}h`}</h4>
      </div>
      <div className={styles.postCardContent}>
        <p>{post}</p>
        {postIndex % 2 === 0 && (
          <Image
            src={faker.image.url()}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="Image accompanying post"
          />
        )}
      </div>
      <PostCardActions />
    </div>
  );
}
