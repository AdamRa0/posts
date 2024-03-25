import styles from "./listitemcomponent.module.css";

import dateFormatter from "../helpers/dateFormatter";
import formatNumber from "../helpers/numericalFormatter";
import ButtonComponent from "../components/ButtonComponent";
import { postsData } from "../data/dummyPostsData";

import {
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdModeComment,
} from "react-icons/md";

type ListComponentData = {
  data: postsData;
};

export default function ListItemComponent({
  data,
}: ListComponentData): React.JSX.Element {
  return (
    <>
      <li className={styles.postItem} key={data.id} tabIndex={0}>
        <div>
          <div className={styles.postHeader}>
            <img
              className={styles.authorAvatar}
              src={data.avatar}
              alt="Post author avatar"
            />
            <h4>{data.username}</h4>
            <p>{data.handle}</p>
            <p>{dateFormatter(data.timeStamp)}</p>
          </div>
          <p>{data.postContent}</p>
          {data.postImage ? (
            <img
              className={styles.postImage}
              src={data.postImage}
              alt="Accompanying post image"
            />
          ) : null}
          <div className={styles.postInteractionButtons}>
            <ButtonComponent variant="postInteractionButton">
              <MdOutlineThumbUp />
              {data.likes >= 1000 ? formatNumber(data.likes) : data.likes}
            </ButtonComponent>
            <ButtonComponent variant="postInteractionButton">
              <MdOutlineThumbDown />
              {data.dislikes >= 1000
                ? formatNumber(data.dislikes)
                : data.dislikes}
            </ButtonComponent>
            <ButtonComponent variant="postInteractionButton">
              <MdModeComment />
              {data.numOfComments >= 1000
                ? formatNumber(data.numOfComments)
                : data.numOfComments}
            </ButtonComponent>
          </div>
        </div>
      </li>
    </>
  );
}
