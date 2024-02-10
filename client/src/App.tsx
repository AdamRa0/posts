import "./App.css";
import { MdSearch } from "react-icons/md";
import { FiMoreHorizontal, FiLogIn } from "react-icons/fi";
import { useState } from "react";
import InputComponent from "./components/InputComponent";

export default function App() {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  function handleClick() {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  }

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
  }

  function handleOpenLoginModal() {
    setIsOptionsMenuOpen(false);
    setIsLoginModalOpen(true);
  }

  return (
    <>
      <header className="header">
        <h1 className="homePageIdentifier" role="alert">
          Home Page
        </h1>
        <div>
          <img className="logo" src="/posts-logo.svg" alt="Site Logo" />
        </div>
        <div className="searchContainer">
          <InputComponent
            className={"search"}
            type={"text"}
            placeholder={"Search Posts"}
          />
          <span className="searchLogoContainer">
            <MdSearch className="searchLogo" />
          </span>
        </div>
        <div className="headerOptions">
          <button className="btnSignIn">Sign In</button>
          <button className="moreOptions" onClick={handleClick}>
            <FiMoreHorizontal className="optionsMenuIcon" />
          </button>
        </div>
        {isOptionsMenuOpen ? (
          <div
            className="headerOptionsMenu"
            tabIndex={0}
            onClick={handleOpenLoginModal}
          >
            <FiLogIn />
            <p>Log In / Sign Up</p>
          </div>
        ) : null}
      </header>
      {isLoginModalOpen ? (
        <LoginPage closeModal={handleCloseLoginModal} />
      ) : null}
    </>
  );
}

type loginPageProps = {
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
};

function LoginPage({ closeModal }: loginPageProps) {
  return (
    <>
      <section className="pageOverlay">
        <div className="authModal">
          <div className="buttonContainer">
            <button onClick={closeModal}>&times;</button>
          </div>
          <div className="loginContent">
            <h1>Log In</h1>
            <p>
              By continuing you agree to our User Agreement and consent to out
              Privacy Policy
            </p>
            <form>
              <div className="inputFields">
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
              <button>Log In</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
