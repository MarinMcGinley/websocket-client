import * as React from "react";
import "./logInPage.scss";
import Header from "../components/header";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const axios = require("axios").default;

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

const LogInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  });

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const validation = (): string => {
    if (email.match(/[a-z,A-Z,0-9]*@[a-z,A-Z,0-9]*.[a-z, -]{2,34}/g) === null) {
      return "email must be on the form 'example@email.com'";
    }
    if (
      password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/g
      ) === null
    ) {
      return "password must be at least 8 characters and at most 20, containing one lowercase letter, one uppercase letter, one number and one special character";
    }
    return;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);
    const validationMessage = validation();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      setLoading(false);
      return;
    }
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

  const DisplayedErrorMessage = () =>
    errorMessage != null ? (
      <p className="error-message">{errorMessage}</p>
    ) : null;

  const Loader = () => (loading ? <div className="loader"></div> : null);

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
          <DisplayedErrorMessage />
          <Loader />
        </form>
      </div>
    </React.Fragment>
  );
};

export default LogInPage;
