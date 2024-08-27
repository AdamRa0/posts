import React, { useContext, useReducer } from "react";

import styles from "@components/feature/forms/authform.module.css";
import ButtonComponent from "@components/ui/ButtonComponent";
import InputComponent from "@components/ui/InputComponent";
import { AuthContext } from "@contexts/authContext";

import { AuthFormReducerActions } from "types/actions/authFormReducerActions";
import { RenderData } from "types/enums/renderData";
import { AuthFormProps } from "types/props/AuthFormProps";
import { AuthFormState } from "types/states/authFomState";

function reducer(
  currentUserDetails: AuthFormState,
  action: AuthFormReducerActions
) {
  switch (action.type) {
    case "update/username":
      return {
        ...currentUserDetails,
        username: action.data,
        handle: `@${action.data}`,
      };

    case "update/emailAddress":
      return {
        ...currentUserDetails,
        emailAddress: action.data,
      };

    case "update/password":
      return {
        ...currentUserDetails,
        password: action.data,
      };

    default:
      return { ...currentUserDetails };
  }
}

const initialState: AuthFormState = {
  username: "",
  emailAddress: "",
  handle: "",
  password: "",
};

export default function AuthForm({
  handleToggle,
  state,
  dispatchFunc,
  closeModal,
}: AuthFormProps): React.JSX.Element {
  const [userDetails, dispatch] = useReducer(reducer, initialState);
  const { signIn, signUp } = useContext(AuthContext);

  function handleOnChange(dispatchType: string, data: string) {
    dispatch({ type: dispatchType, data: data });
  }

  function handleFormSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    switch (state.count) {
      case 0:
        signUp!(userDetails);
        closeModal();
        break;
      case 1:
        signIn!(userDetails);
        closeModal();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <form className={styles.authForm} onSubmit={handleFormSubmit}>
        <div className={styles.inputFields}>
          {(state.count === 0 || state.count === 3) && (
            <InputComponent
              className={"formInput"}
              type="text"
              placeholder="Username"
              value={userDetails.username}
              onChange={(input) =>
                handleOnChange("update/username", input.target.value)
              }
            />
          )}
          <InputComponent
            className={"formInput"}
            type="email"
            value={userDetails.emailAddress}
            placeholder="Email Address"
            onChange={(input) =>
              handleOnChange("update/emailAddress", input.target.value)
            }
          />
          {(state.count === 0 || state.count === 1) && (
            <InputComponent
              className={"formInput"}
              type="password"
              value={userDetails.password}
              placeholder="Password"
              onChange={(input) =>
                handleOnChange("update/password", input.target.value)
              }
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
                      dispatchFunc(RenderData.FORGOT_USERNAME);
                    }}
                  >
                    username
                  </ButtonComponent>{" "}
                  or{" "}
                  <ButtonComponent
                    type="button"
                    variant="linkButton"
                    onClick={() => {
                      dispatchFunc(RenderData.FORGOT_PASSWORD);
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
          <ButtonComponent type="submit" variant={"btnSignInAlt"}>
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
    </>
  );
}
