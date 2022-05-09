import * as React from "react";
import "./logInPage.scss";
import Header from "../components/header";
import { AxiosResponse } from "axios";

const axios = require("axios").default;

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

type State = {
  email: string;
  password: string;
  errorMessage: string;
};

type Props = {};

class LogInPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event: any) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event: any) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    axios
      .post(`${serverUrl}/api/authentication/signin`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((result: AxiosResponse) => {});
  }

  render() {
    return (
      <div>
        <Header />
        <div className="login-container">
          <form className="login-form">
            <label className="labels">
              <div className="label-div">email</div>
              <input
                className="login-input"
                type="text"
                name="email"
                onChange={this.handleEmailChange}
              />
            </label>
            <label className="labels">
              <div className="label-div">password</div>
              <input
                className="login-input"
                type="text"
                name="password"
                onChange={this.handlePasswordChange}
              />
            </label>
            <input
              className="login-button"
              type="submit"
              value="sign in"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default LogInPage;
