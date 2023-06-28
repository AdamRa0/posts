import styles from "./authRight.module.scss";
import Image from "next/image";
import MajorButton from "../majorButton";

export default function AuthRight({ user, onButtonClick }) {
  const signOutText = "Sign Out";

  return (
    <section className={styles.parentContainer}>
      <div className={styles.avatarImageContainer}>
        {/* TODO: Replace with image avatar */}
      </div>
      <h2>{user.username}</h2>
      <h3>{user.handle}</h3>
      <div className={styles.parentContainerItem}>
        <Image
          src="/notifications.svg"
          height={36}
          width={36}
          alt="Notification Icon."
        />
        <p>No Active Notifications</p>
      </div>
      <div className={styles.parentContainerItem}>
        <Image
          src="/settings.svg"
          height={36}
          width={36}
          alt="Notification Icon."
        />
        <p>Settings</p>
      </div>
      <MajorButton text={signOutText} buttonFunction={onButtonClick} />
    </section>
  );
}
