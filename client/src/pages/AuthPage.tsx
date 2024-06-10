import styles from "./authpage.module.css";

import ModalComponent from "@components/ui/ModalComponent";
import PageOverlayComponent from "@components/ui/PageOverlayComponent";
import InputComponent from "@components/ui/InputComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import { useReducer } from "react";

type authPageProps = {
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
};

enum RenderData {
  SIGNUP,
  LOGIN,
  FORGOT_PASSWORD,
  FORGOT_USERNAME,
}

type countState = {
  count: number;
};

function reducer(currentState: countState, action: RenderData) {
  switch (action) {
    case RenderData.SIGNUP:
      return {
        ...currentState,
        count: 0,
      };

    case RenderData.LOGIN:
      return {
        ...currentState,
        count: 1,
      };

    case RenderData.FORGOT_USERNAME:
      return {
        ...currentState,
        count: 2,
      };

    case RenderData.FORGOT_PASSWORD:
      return {
        ...currentState,
        count: 3,
      };

    default:
      throw new Error("Undefined action");
  }
}

export default function AuthPage({ closeModal }: authPageProps) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function handleToggle(): void {
    if (state.count === 0) {
      dispatch(RenderData.LOGIN);
    } else if (state.count === 1) {
      dispatch(RenderData.SIGNUP);
    }
  }

  function goBack() {
    dispatch(RenderData.SIGNUP);
  }

  return (
    <>
      <PageOverlayComponent>
        <ModalComponent
          isVisible={state.count === 2 || state.count === 3 ? true : false}
          goBack={state.count === 2 || state.count === 3 ? goBack : () => {}}
          closeModal={closeModal}
        >
          <div>
            <h1>
              {state.count === 0
                ? "Sign Up"
                : state.count === 1
                ? "Log In"
                : state.count === 2
                ? "Forgot Username"
                : state.count === 3
                ? "Forgot Password"
                : ""}
            </h1>
            <p>
              {(state.count === 0 || state.count === 1) &&
                "By continuing you agree to our User Agreement and consent to out Privacy Policy"}
              {state.count === 2 &&
                "Tell us the email address associated with your Posts account, and we’ll send you an email with your username."}
              {state.count === 3 &&
                "Tell us the username and email address associated with your Posts account, and we’ll send you an email with a link to reset your password."}
            </p>
            <form className={styles.authForm}>
              <div className={styles.inputFields}>
                {(state.count === 0 ||
                  state.count === 1 ||
                  state.count === 3) && (
                  <InputComponent
                    className={"formInput"}
                    type="text"
                    placeholder="Username"
                  />
                )}
                {(state.count === 0 ||
                  state.count === 2 ||
                  state.count === 3) && (
                  <InputComponent
                    className={"formInput"}
                    type="email"
                    placeholder="Email Address"
                  />
                )}
                {(state.count === 0 || state.count === 1) && (
                  <InputComponent
                    className={"formInput"}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </div>
              {(state.count === 0 || state.count === 1) && (
                <>
                  <p>
                    {state.count === 0 ? (
                      <span>
                        Forgot your{" "}
                        <ButtonComponent
                          type="button"
                          variant="linkButton"
                          onClick={() => {
                            dispatch(RenderData.FORGOT_USERNAME);
                          }}
                        >
                          username
                        </ButtonComponent>{" "}
                        or{" "}
                        <ButtonComponent
                          type="button"
                          variant="linkButton"
                          onClick={() => {
                            dispatch(RenderData.FORGOT_PASSWORD);
                          }}
                        >
                          password
                        </ButtonComponent>
                        ?
                      </span>
                    ) : null}
                  </p>
                  <p>
                    {state.count === 1 ? "New to Posts?" : "Already a poster?"}{" "}
                    <ButtonComponent
                      type="button"
                      variant="linkButton"
                      onClick={handleToggle}
                    >
                      {state.count === 1 ? "Sign Up" : "Log In"}
                    </ButtonComponent>
                  </p>
                </>
              )}
              <div style={{ marginTop: "20px" }}>
                <ButtonComponent type="button" variant={"btnSignInAlt"}>
                  {state.count === 0
                    ? "Sign Up"
                    : state.count === 1
                    ? "Log In"
                    : state.count === 2
                    ? "Email Me"
                    : state.count === 3
                    ? "Reset Password"
                    : ""}
                </ButtonComponent>
              </div>
            </form>
          </div>
        </ModalComponent>
      </PageOverlayComponent>
    </>
  );
}
