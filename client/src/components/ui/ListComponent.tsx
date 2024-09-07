import { PostData } from "types/data/postData";
import ListItemComponent from "./ListItemComponent";
import styles from "./listcomponent.module.css";
import { User } from "types/data/userData";

type ListComponentProps = {
  data: PostData[] | User[];
  typeOfData: string;
  reff?: React.LegacyRef<HTMLLIElement>;
};

export default function ListComponent({
  data,
  typeOfData,
  reff,
}: ListComponentProps): React.JSX.Element {
  const items = data.map((item: PostData | User, index: number) => {
    if (data.length === index + 1 && typeOfData === "post") {
      return <ListItemComponent item={item} typeOfData={typeOfData} reff={reff} />;
    }
    return <ListItemComponent item={item} typeOfData={typeOfData} />;
  });

  return (
    <>
      <ul
        className={typeOfData !== "comment" ? styles.generalList : styles.list}
      >
        {items}
      </ul>
    </>
  );
}
