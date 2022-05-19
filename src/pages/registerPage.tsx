import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "./registerPage.scss";

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

type RegisterProps = {
  handleSuccessfulRegistration: Function;
};

const Register = (props: RegisterProps) => {
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleFirstPasswordChange = (event: any) => {
    setFirstPassword(event.target.value);
  };

  const handleSecondPasswordChange = (event: any) => {
    setSecondPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const validationMessage = validation();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      setLoading(false);
      return;
    }

    axios
      .post(`${serverUrl}/api/users`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: firstPassword,
      })
      .then((result: AxiosResponse) => {
        setLoading(false);
        props.handleSuccessfulRegistration(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        console.log(error.message);
        setLoading(false);
        setErrorMessage(error.message);
      });
  };

  const DisplayedErrorMessage = () =>
    errorMessage != null ? (
      <p className="error-message">{errorMessage}</p>
    ) : null;

  const Loader = () => (loading ? <div className="loader"></div> : null);

  const validation = (): string => {
    console.log("firstName: " + firstName);
    console.log(firstName.match(/[a-z,A-Z]{1,50}/g));
    if (firstName.match(/[a-z,A-Z]{1,50}/g) === null)
      return "first name cannot be empty";
    if (lastName.match(/[a-z,A-Z]{1,50}/g) === null)
      return "last name cannot be empty";
    if (email.match(/[a-z,A-Z,0-9]*@[a-z,A-Z,0-9]*.[a-z, -]{2,34}/g) === null)
      return "Email must be on the form 'example@email.com'";
    if (firstPassword !== secondPassword) return "passwords must match";
    console.log(
      firstPassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/g
      )
    );
    if (
      firstPassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/g
      ) === null
    ) {
      return "password must be at least 8 characters and at most 20, containing one lowercase letter, one uppercase letter, one number and one special character";
    }
    //https://javascript.info/regexp-lookahead-lookbehind
    // MarraPjalla4$

    return;
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <label className="labels">
          <div className="label-div">first name</div>
          <input
            className="register-input"
            type="text"
            name="first-name"
            onChange={handleFirstNameChange}
          />
        </label>
        <label className="labels">
          <div className="label-div">last name</div>
          <input
            className="register-input"
            type="text"
            name="last-name"
            onChange={handleLastNameChange}
          />
        </label>
        <label className="labels">
          <div className="label-div">email</div>
          <input
            className="register-input"
            type="text"
            name="email"
            onChange={handleEmailChange}
          />
        </label>
        <label className="labels">
          <div className="label-div">password</div>
          <input
            className="register-input"
            type="password"
            name="password"
            onChange={handleFirstPasswordChange}
          />
        </label>
        <label className="labels">
          <div className="label-div">repeat password</div>
          <input
            className="register-input"
            type="password"
            name="password"
            onChange={handleSecondPasswordChange}
          />
        </label>
        <input
          className="register-button"
          type="submit"
          value="register"
          onClick={handleSubmit}
        />
        <DisplayedErrorMessage />
        <Loader />
      </form>
    </div>
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [successfulRegister, setSuccessfulRegister] = useState(false);

  const RedirectToSignIn = () => {
    return (
      <div className="register-container">
        <div className="register-form">
          <p className="center-text">you have successfully registered!</p>
          <button
            className="register-button"
            onClick={(event: any) => {
              event.preventDefault();
              navigate("/login");
            }}
          >
            sign in
          </button>
        </div>
      </div>
    );
  };

  const handleRegistration = (successfulRegisterFromChild: boolean) => {
    setSuccessfulRegister(successfulRegisterFromChild);
  };

  return (
    <React.Fragment>
      <Header />
      {successfulRegister ? (
        <RedirectToSignIn />
      ) : (
        <Register handleSuccessfulRegistration={handleRegistration} />
      )}
    </React.Fragment>
  );
};

export default RegisterPage;
