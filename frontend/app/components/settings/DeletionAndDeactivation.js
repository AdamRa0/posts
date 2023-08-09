import Button from "../buttons/Button";
import styles from "./deletionanddeactivation.module.scss";

export default function DeletionAndDeactivation() {
  return (
    <>
      <section>
        <div className={styles.ddItem}>
          <h2>Delete Account: </h2>
          <button className={styles.buttonDelete}>Delete</button>
        </div>
        <div className={styles.ddItem}>
          <h2>Deactivate Account: </h2>
          <Button text={"Deactivate"} />
        </div>
      </section>
    </>
  );
}
