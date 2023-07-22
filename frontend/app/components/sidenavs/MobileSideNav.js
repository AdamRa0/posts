import styles from "./mobilesidenav.module.scss";
import Button from "../Button";
import SquaresList from "../lists/SquaresList";

export default function MobileSideNav({ isOpen }) {
  return (
    <section
      className={
        isOpen
          ? `${styles.mobileSideNav} ${styles.active}`
          : styles.mobileSideNav
      }
    >
      <section className={styles.mobileSideNavUpper}>
        <div>
          <p className={styles.sectionTitle}>Feed</p>
          <SquaresList />
        </div>
        <div>
          <p className={styles.sectionTitle}>Profile</p>
          {/* Show message if unauthenticated, else, show pfp, username, handle, notifications and settings */}
          <p>Sign up now for a personalized square</p>
        </div>
      </section>
      <section className={styles.mobileSideNavLower}>
        <div>
          <div className={styles.mobileSideNavLowerUpper}>
            <h2>New to posts?</h2>
            <Button
              text={"Join Posts"}
              handleOnClick={() => router.push("/auth/signup")}
            />
          </div>
          <p>
            By signing up, you agree to our <span>terms of service</span> and{" "}
            <span>privacy policy</span> including <span>cookie use</span>
          </p>
        </div>
      </section>
    </section>
  );
}
