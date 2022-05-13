import * as React from "react";
import "./logInPage.scss";
import Header from "../components/header";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const axios = require("axios").default;

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

const LogInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("handleSubmit");
    setErrorMessage("");
    setLoading(true);
    axios
      .post(`${serverUrl}/api/authentication/signin`, {
        email: email,
        password: password,
      })
      .then((result: AxiosResponse) => {
        // where to store the fuckan token??
        setLoading(false);
        localStorage.setItem("authToken", result.data.accessToken);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        setErrorMessage("wrong email or password");
      });
  };

  const displayedErrorMessage =
    errorMessage != null ? (
      <p className="error-message">{errorMessage}</p>
    ) : null;

  const loader = loading ? <div className="loader"></div> : null;

  return (
    <React.Fragment>
      <Header />
      <div className="login-container">
        <form className="login-form">
          <label className="labels">
            <div className="label-div">email</div>
            <input
              className="login-input"
              type="text"
              name="email"
              onChange={handleEmailChange}
            />
          </label>
          <label className="labels">
            <div className="label-div">password</div>
            <input
              className="login-input"
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </label>
          <input
            className="login-button"
            type="submit"
            value="sign in"
            onClick={handleSubmit}
          />
          {displayedErrorMessage}
          {loader}
        </form>
      </div>
    </React.Fragment>
  );
};

export default LogInPage;
