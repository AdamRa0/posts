import Image from "next/image";
import styles from './sidenav.module.scss';

export default function SideNav() {
  return (
    <section className={styles.parentContainer}>
      <div className={styles.parentContainerItem}>
        <Image src="/public.svg" height={36} width={36} alt="Image of world." />
        <p>Public Square</p>
      </div>
      <div className={styles.parentContainerItem}>
        <Image
          src="/community.svg"
          height={36}
          width={36}
          alt="Image of a group of people."
        />
        <p>Private Square</p>
      </div>
    </section>
  );
}
