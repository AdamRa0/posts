import styles from "./loginpage.module.css";

import ModalComponent from "../components/ModalComponent";
import PageOverlayComponent from "../components/PageOverlayComponent";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";

type loginPageProps = {
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function LoginPage({ closeModal }: loginPageProps) {
  return (
    <>
      <PageOverlayComponent>
        <ModalComponent closeModal={closeModal}>
          <div className="loginContent">
            <h1>Log In</h1>
            <p>
              By continuing you agree to our User Agreement and consent to out
              Privacy Policy
            </p>
            <form className={styles.loginForm}>
              <div className={styles.inputFields}>
                <InputComponent
                  className={"formInput"}
                  type={"text"}
                  placeholder={"Username"}
                />
                <InputComponent
                  className={"formInput"}
                  type={"password"}
                  placeholder={"Password"}
                />
              </div>
              <p>Forgot your username or password?</p>
              <p>New to Posts? Sign Up</p>
              <ButtonComponent type={"btnSignInAlt"}>Log In</ButtonComponent>
            </form>
          </div>
        </ModalComponent>
      </PageOverlayComponent>
    </>
  );
}
