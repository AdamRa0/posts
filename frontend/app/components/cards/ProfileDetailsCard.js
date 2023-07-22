import styles from "./profiledetailscard.module.scss";

import { faker } from "@faker-js/faker";

import Image from "next/image";

import Button from "../Button";

export default function ProfileDetailsCard() {
  const userName = "Test Username";
  const userHandle = "testusername";
  const userBio = "Hello there, new to posts.";

  return (
    <>
      <section className={styles.profileDetails}>
        <div className={styles.bannerImage}>
          <Image
            src={faker.image.url()}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="User banner image"
          />
        </div>
        <div className={styles.profileAvatar}>
          <Image
            src={faker.internet.avatar()}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="User profile image"
          />
        </div>
        <Button text={"Subscribe"} />
        <div className={styles.userDetails}>
          <h3 tabIndex={0}>{userName} </h3>
          <h4 tabIndex={0}>{userHandle} </h4>
          <p>{userBio}</p>
        </div>
        <div className={styles.userNetwork}>
          <div tabIndex={0}>
            <h3>200</h3>
            <p>Subscribers</p>
          </div>
          <div tabIndex={0}>
            <h3>500</h3>
            <p>Subscribees</p>
          </div>
        </div>
      </section>
    </>
  );
}
