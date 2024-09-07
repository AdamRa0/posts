import styles from "./listitemcomponent.module.css";

import { useNavigate } from "react-router-dom";

import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import PostItemComponent from "@components/feature/PostItemComponent";
import CommentComponent from "@components/feature/CommentComponent";

import { PostData } from "types/data/postData";
import { User } from "types/data/userData";

type ListComponentData = {
  item: PostData | User;
  typeOfData: string;
  reff?: React.LegacyRef<HTMLLIElement>
};

export default function ListItemComponent({
  item,
  typeOfData,
  reff
}: ListComponentData): React.JSX.Element {
  const link =
    typeOfData === "post"
      ? `/post/${item.id}`
      : `/user/${item.id}`;

  const navigate = useNavigate();

  function handleNavigate(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    typeOfData !== "comment" ? navigate(link) : () => {};
  }

  return (
    <>
      <li
        className={
          typeOfData !== "comment" ? styles.postOrUser : styles.comment
        }
        key={item.id}
        onClick={(e) => handleNavigate(e)}
        tabIndex={0}
        ref={typeOfData === "post" ? reff : undefined}
      >
        {typeOfData === "post" && <PostItemComponent post={item as PostData} />}
        {typeOfData === "comment" && (
          <CommentComponent post={item as PostData} />
        )}
        {typeOfData === "user" && (
          <AuthorDetailsComponent authorID={item.id} />
        )}
      </li>
    </>
  );
}
