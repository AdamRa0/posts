import styles from "./authpage.module.css";

import ModalComponent from "../components/ModalComponent";
import PageOverlayComponent from "../components/PageOverlayComponent";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";

type authPageProps = {
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function AuthPage({ closeModal }: authPageProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <>
      <PageOverlayComponent>
        <ModalComponent closeModal={closeModal}>
          <div>
            <h1>{toggle === false ? "Log In" : "Sign Up"}</h1>
            <p>
              By continuing you agree to our User Agreement and consent to out
              Privacy Policy
            </p>
            <form className={styles.authForm}>
              <div className={styles.inputFields}>
                <InputComponent
                  className={"formInput"}
                  type={"text"}
                  placeholder={"Username"}
                />
                {toggle === true && (
                  <InputComponent
                    className={"formInput"}
                    type={"email"}
                    placeholder={"Email Address"}
                  />
                )}
                <InputComponent
                  className={"formInput"}
                  type={"password"}
                  placeholder={"Password"}
                />
              </div>
              <p>
                {toggle === false ? "Forgot your username or password?" : null}
              </p>
              <p>
                {toggle === false ? "New to Posts?" : "Already a poster?"}{" "}
                <ButtonComponent variant="linkButton" onClick={handleToggle}>
                  {toggle === false ? "Sign Up" : "Log In"}
                </ButtonComponent>
              </p>
              <ButtonComponent variant={"btnSignInAlt"}>
                {toggle === false ? "Log In" : "Sign Up"}
              </ButtonComponent>
            </form>
          </div>
        </ModalComponent>
      </PageOverlayComponent>
    </>
  );
}
