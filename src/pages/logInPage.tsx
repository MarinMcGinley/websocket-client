import * as React from "react";
import "./logInPage.scss";
import Header from "../components/header";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

function LogInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("handleSubmit");
    axios
      .post(`${serverUrl}/api/authentication/signin`, {
        email: email,
        password: password,
      })
      .then((result: AxiosResponse) => {
        // where to store the fuckan token??
        localStorage.setItem("authToken", result.data.accessToken);
        console.log("login success");
        navigate("/home");
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

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
        </form>
      </div>
    </React.Fragment>
  );
}

export default LogInPage;
