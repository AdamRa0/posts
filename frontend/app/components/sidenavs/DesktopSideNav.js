import styles from "./desktopsidenav.module.scss";

import { useRouter } from "next/navigation";

import Button from "../buttons/Button";
import SquaresList from "../lists/SquaresList";
import NotificationsAndSettingsList from "../lists/NotificationsAndSettingsList";
import Image from "next/image";
import Link from "next/link";

export default function DesktopSideNav({ authenticatedUser }) {
  const router = useRouter();

  return (
    <>
      <section
        className={
          authenticatedUser !== null
            ? `${styles.left} ${styles.authenticated}`
            : styles.left
        }
      >
        <section
          className={
            authenticatedUser !== null
              ? `${styles.leftUpper} ${styles.leftUpperAuthenticated}`
              : styles.leftUpper
          }
        >
          <div>
            <p className={styles.sectionTitle}>Feed</p>
            <SquaresList />
          </div>
          <div className={styles.profileDetails}>
            <p className={styles.sectionTitle}>Profile</p>
            {authenticatedUser !== null ? (
              <div className={styles.detailsAndSettingsContainer}>
                <div className={styles.userDetails}>
                  <Image
                    src={`/api/v1/media/${authenticatedUser.profile_image}`}
                    width={60}
                    height={60}
                    alt="User profile image"
                  />
                  <div className={styles.userInternetNames}>
                    <Link href="/profile">
                      <p className={styles.username}>
                        {authenticatedUser.username}
                      </p>
                    </Link>
                    <Link href="/profile">
                      <p className={styles.handle}>
                        {authenticatedUser.handle}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className={styles.notificationsAndSettings}>
                  <NotificationsAndSettingsList />
                </div>
              </div>
            ) : (
              <p>Sign up now for a personalized square</p>
            )}
          </div>
        </section>
        {authenticatedUser !== null ? (
          <div></div>
        ) : (
          <section className={styles.leftLower}>
            <div>
              <div className={styles.leftLowerUpper}>
                <h2>New to posts?</h2>
                <Button
                  text={"Join Posts"}
                  handleOnClick={() => router.push("/auth/signup")}
                />
              </div>
              <p>
                By signing up, you agree to our <span>terms of service</span>{" "}
                and <span>privacy policy</span> including{" "}
                <span>cookie use</span>
              </p>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
