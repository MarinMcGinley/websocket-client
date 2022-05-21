import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

type MyProps = {
  loggedIn: boolean;
};

const Header = (props: MyProps) => {
  const navigate = useNavigate();

  const handleLoggingOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const LogOutButton = () => {
    return props.loggedIn ? (
      <button className="log-out-button" onClick={handleLoggingOut}>
        sign out
      </button>
    ) : null;
  };

  return (
    <div className="header-container">
      <LogOutButton />
      <h1 className="title">blabla</h1>
    </div>
  );
};

export default Header;
