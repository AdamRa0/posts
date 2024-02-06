import "./App.css";
import { MdSearch } from "react-icons/md";
import { FiMoreHorizontal, FiLogIn } from "react-icons/fi";

export default function App() {
  return (
    <>
      <header className="header">
        <div>
          <img className="logo" src="/posts-logo.svg" alt="Site Logo" />
        </div>
        <div className="searchContainer">
          <input className="search" type="text" placeholder="Search Posts" />
          <span className="searchLogoContainer">
            <MdSearch className="searchLogo" />
          </span>
        </div>
        <div className="headerOptions">
          <button className="btnSignIn">Sign In</button>
          <button className="moreOptions">
            <FiMoreHorizontal className="optionsMenuIcon" />
          </button>
        </div>
        <div className="headerOptionsMenu" tabIndex={0}>
          <FiLogIn />
          <p>Log In / Sign Up</p>
        </div>
      </header>
    </>
  );
}
